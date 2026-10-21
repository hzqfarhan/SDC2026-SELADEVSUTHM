import {skills,type SkillId} from './catalogue';
export const MAX_RESUME_BYTES=5*1024*1024;
export function validateResume(name:string,size:number){
 if(!/\.(pdf|docx|txt)$/i.test(name))throw Error('Choose a PDF, DOCX or plain-text (.txt) resume.');
 if(size===0||size>MAX_RESUME_BYTES)throw Error('Choose a non-empty file smaller than 5 MB.');
}
/** Mentions only: no proficiency, demographic or employability inference. */
export function analyseResume(text:string){
 const sentences=text.replace(/\r/g,'').split(/\n|(?<=[.!?])\s+/).map(s=>s.trim()).filter(Boolean);
 return skills.flatMap(skill=>{
  const found=sentences.find(sentence=>skill.terms.some(term=>new RegExp(`\\b${term}\\b`,'i').test(sentence)));
  return found?[{id:skill.id as SkillId,name:skill.name,evidence:found.slice(0,280)}]:[];
 });
}
export async function readResume(file:File){
 validateResume(file.name,file.size);
 let text='';
 if(/\.txt$/i.test(file.name))text=await file.text();
 else if(/\.docx$/i.test(file.name)){
  const mammoth=await import('mammoth/mammoth.browser');
  text=(await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()})).value;
 }else{
  const pdfjs=await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc='/workers/pdf.worker.min.mjs';
  const task=pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer()),useSystemFonts:true});
  try{
   const pdf=await task.promise;
   if(pdf.numPages>30)throw Error('Please use a resume of 30 pages or fewer.');
   for(let i=1;i<=pdf.numPages;i++){
    const content=await (await pdf.getPage(i)).getTextContent();
    text+=content.items.map(item=>'str' in item?item.str+('hasEOL' in item&&item.hasEOL?'\n':' '):'').join('')+'\n';
   }
  }finally{await task.destroy();}
 }
 if(text.length>100000)throw Error('This document is too long. Use a shorter resume or paste a relevant excerpt.');
 if(text.trim().length<30)throw Error('Not enough readable text. Scanned PDFs need OCR first; try DOCX or paste text below.');
 return text;
}
