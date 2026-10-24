import {readFile} from 'node:fs/promises';
import {createHash,timingSafeEqual} from 'node:crypto';
import {CloudError,validateInput} from './cloud-gateway.mjs';
export const COUNCIL_MODEL='Qwen/Qwen3-4B-Instruct-2507';
export const COUNCIL_REVISION='cdbee75f17c01a7cc42f958dc650907174af0554';
export const STAGES=['profile','roles','learning','critic'];
const digest=v=>createHash('sha256').update(v).digest();
const send=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
const fail=()=>{throw new CloudError(502,'A review failed the grounding checks. No complete Council report was produced.');};
const exact=(obj,keys)=>{if(!obj||Array.isArray(obj)||typeof obj!=='object'||Object.keys(obj).sort().join('|')!==[...keys].sort().join('|'))fail();};
const prose=(value,max=700)=>{if(typeof value!=='string'||!value.trim()||value.length>max||/https?:\/\/|www\.|<\/?[a-z]/i.test(value))fail();return value;};
const list=(values,min,max,check)=>{if(!Array.isArray(values)||values.length<min||values.length>max)fail();values.forEach(check);};
const known=(value,ids)=>{if(typeof value!=='string'||!ids.has(value))fail();};
export function validateReview(stage,review,context){
 const sourceIds=new Set(context.sources.map(s=>s.id)),roleIds=new Set(context.roles.map(r=>r.id)),courseIds=new Set(context.courses.map(c=>c.id)),skillIds=new Set(context.skills.map(s=>s.id));
 const fields={profile:['summary','observations','uncertainties','sourceIds'],roles:['summary','roleIds','reasoning','sourceIds'],learning:['summary','courseIds','project','sourceIds'],critic:['summary','cautions','checkQuestions','sourceIds']};
 if(!fields[stage])fail();exact(review,fields[stage]);prose(review.summary,500);list(review.sourceIds,1,8,id=>known(id,sourceIds));if(new Set(review.sourceIds).size!==review.sourceIds.length)fail();
 if(stage==='profile'){
  list(review.observations,0,4,o=>{exact(o,['skillId','quote','interpretation']);known(o.skillId,skillIds);prose(o.quote,240);prose(o.interpretation,320);if(!context.fictionalText.includes(o.quote))fail();});
  list(review.uncertainties,1,3,s=>prose(s,320));if(!review.sourceIds.includes('profile'))fail();
 }
 if(stage==='roles'){list(review.roleIds,1,3,id=>{known(id,roleIds);if(!review.sourceIds.includes(`role:${id}`))fail();});if(new Set(review.roleIds).size!==review.roleIds.length)fail();prose(review.reasoning);}
 if(stage==='learning'){list(review.courseIds,1,5,id=>{known(id,courseIds);if(!review.sourceIds.includes(`course:${id}`))fail();});if(new Set(review.courseIds).size!==review.courseIds.length)fail();prose(review.project,500);}
 if(stage==='critic'){list(review.cautions,1,4,s=>prose(s,320));list(review.checkQuestions,1,3,s=>prose(s,320));}
 return review;
}
export function orderCourses(ids,courses){
 const result=[],done=new Set(),visiting=new Set();
 function visit(id){if(done.has(id))return;if(visiting.has(id))throw new CloudError(503,'The learning catalogue has a prerequisite cycle.');const course=courses.find(c=>c.id===id);if(!course)throw new CloudError(503,'The learning catalogue is incomplete.');visiting.add(id);for(const pre of course.prerequisites)visit(pre);visiting.delete(id);done.add(id);result.push(course);}
 ids.forEach(visit);return result;
}
export function makeContext(text,catalogue,research){
 if(catalogue.schemaVersion!==1||catalogue.roles?.length!==6||catalogue.courses?.length!==10||catalogue.skills?.length!==10)throw new CloudError(503,'Build the Council catalogue before starting.');
 const sources=[{id:'profile',title:'Explicitly confirmed fictional experience',limit:'Unverified fictional text; mentions do not certify proficiency.'},...catalogue.roles.map(r=>({id:r.sourceId,title:r.name,url:r.url,limit:'US O*NET occupation reference; the project authors the six-role rubric.'})),...catalogue.courses.map(c=>({id:c.sourceId,title:c.title,url:c.url,limit:c.access})),...catalogue.sources];
 for(const [i,p] of (research.items??[]).slice(0,3).entries())if(typeof p.title==='string'&&p.title.length<400&&typeof p.url==='string'&&p.url.startsWith('https://arxiv.org/abs/'))sources.push({id:`paper:${i}`,title:p.title,url:p.url,date:p.published,limit:'Research title metadata only; not a finding, vacancy count or Malaysian forecast.'});
 const context={fictionalText:text,skills:catalogue.skills,roles:catalogue.roles,courses:catalogue.courses,sources,limits:'Fictional demonstration only. The authored local skill rubric stays unchanged. Course hours are authored estimates; free content may have optional charges. No salary, job probability, invented demand statistics, proficiency certification or measured SDG outcomes. The critic shares the same model and cannot certify correctness.'};
 if(JSON.stringify(context).length>16000)throw new CloudError(503,'Trusted context exceeds the reviewed model boundary.');return context;
}
async function readBody(req){const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>12000)throw new CloudError(413,'Request too large.');chunks.push(chunk);}try{return JSON.parse(Buffer.concat(chunks).toString());}catch{throw new CloudError(400,'Use valid JSON.');}}
export function validateReceipt(output,stage,context){
 exact(output,['schemaVersion','stage','model','revision','device','generatedAt','durationMs','inputTokens','outputTokens','review']);
 if(!output||output.schemaVersion!==1||output.stage!==stage||output.model!==COUNCIL_MODEL||output.revision!==COUNCIL_REVISION||!['cuda','cpu'].includes(output.device)||!Number.isFinite(Date.parse(output.generatedAt)))fail();
 for(const [key,max] of [['inputTokens',6144],['outputTokens',384],['durationMs',300000]])if(!Number.isInteger(output[key])||output[key]<(key==='durationMs'?0:1)||output[key]>max)fail();
 validateReview(stage,output.review,context);return output;
}
export function createCouncilGateway({env=process.env,fetchImpl=fetch,clock=()=>Date.now(),loadCatalogue=async()=>JSON.parse(await readFile('server-data/council-catalogue.json','utf8')),loadResearch=async()=>JSON.parse(await readFile('out/data/research.json','utf8'))}={}){
 const key=env.RUNPOD_API_KEY??'',endpoint=env.RUNPOD_COUNCIL_ENDPOINT_ID??'',code=env.CLOUD_ACCESS_CODE??'';
 const configured=!!key&&/^[a-zA-Z0-9_-]{3,64}$/.test(endpoint)&&code.length>=12;
 const limit=Math.min(5,Math.max(1,Math.floor(Number(env.COUNCIL_DAILY_SESSION_LIMIT)||3)));
 const cache=new Map();let day='',sessions=0,busy=false;
 return async(req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;if(!['/api/council-status','/api/career-council'].includes(pathname))return false;
  const today=new Date(clock()).toISOString().slice(0,10);if(day!==today){day=today;sessions=0;}
  if(pathname==='/api/council-status'){send(res,req.method==='GET'?200:405,req.method==='GET'?{configured,model:COUNCIL_MODEL,revision:COUNCIL_REVISION,mode:configured?'configured-unverified':'setup-required',stages:STAGES,remainingSessions:Math.max(0,limit-sessions),callsPerSession:4}: {error:'Use GET.'});return true;}
  let streaming=false,disconnected=false;const events=value=>{if(!disconnected)res.write(JSON.stringify(value)+'\n');};
  try{
   if(req.method!=='POST')throw new CloudError(405,'Use POST.');
   if(req.headers.origin){let origin;try{origin=new URL(req.headers.origin);}catch{throw new CloudError(403,'Origin not permitted.');}if(origin.host!==req.headers.host||!['https:','http:'].includes(origin.protocol))throw new CloudError(403,'Only this application may request a Council review.');}
   if(!(req.headers['content-type']??'').startsWith('application/json'))throw new CloudError(415,'Use JSON.');
   if(!configured)throw new CloudError(503,'Career Council needs the separate RunPod Council endpoint and server secrets. The local atlas is ready.');
   const input=validateInput(await readBody(req));if(!timingSafeEqual(digest(input.accessCode),digest(code)))throw new CloudError(401,'Incorrect demo access code.');
   const context=makeContext(input.text,await loadCatalogue(),await loadResearch());
   const hash=createHash('sha256').update(JSON.stringify({context,revision:COUNCIL_REVISION,promptVersion:1})).digest('hex'),prior=cache.get(hash);
   res.on?.('close',()=>{if(!res.writableEnded)disconnected=true;});
   if(prior&&clock()-prior.at<3600000){res.writeHead(200,{'Content-Type':'application/x-ndjson','Cache-Control':'no-store','X-Accel-Buffering':'no'});events({event:'complete',report:{...prior.report,cached:true}});res.end();return true;}
   if(busy)throw new CloudError(429,'A Council session is already running.');if(sessions>=limit)throw new CloudError(429,'Today’s Council demonstration allowance is reached. Local matching remains available.');
   busy=true;sessions++;const reviews=[];
   res.writeHead(200,{'Content-Type':'application/x-ndjson; charset=utf-8','Cache-Control':'no-store','X-Accel-Buffering':'no','X-Content-Type-Options':'nosniff'});res.flushHeaders?.();streaming=true;
   try{
    for(const stage of STAGES){
     if(disconnected)break;events({event:'started',stage});
     const response=await fetchImpl(`https://api.runpod.ai/v2/${endpoint}/runsync?wait=90000`,{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({input:{schemaVersion:1,stage,context:JSON.stringify(context),prior:reviews.map(r=>({stage:r.stage,review:r.review}))}}),signal:AbortSignal.timeout(100000)});
     if(!response.ok)throw new CloudError(502,'The Council worker could not complete a review. Check endpoint health and sponsor credit.');
     const job=await response.json();
     if(job.status!=='COMPLETED'){
      if(['IN_QUEUE','IN_PROGRESS'].includes(job.status)&&/^[a-zA-Z0-9_-]{1,150}$/.test(job.id??''))try{await fetchImpl(`https://api.runpod.ai/v2/${endpoint}/cancel/${job.id}`,{method:'POST',headers:{Authorization:`Bearer ${key}`},signal:AbortSignal.timeout(5000)});}catch{}
      throw new CloudError(504,'A Council pass did not finish. Cancellation was requested where possible. No complete report is available.');
     }
     const output=validateReceipt(job.output,stage,context),receipt={...output,jobId:typeof job.id==='string'?job.id.slice(0,150):null};reviews.push(receipt);events({event:'review',stage,receipt});
    }
    if(!disconnected&&reviews.length===4){
     const plan=orderCourses(reviews.find(r=>r.stage==='learning').review.courseIds,context.courses);
     const report={schemaVersion:1,promptVersion:1,model:COUNCIL_MODEL,revision:COUNCIL_REVISION,generatedAt:new Date(clock()).toISOString(),cached:false,reviews,sources:context.sources.filter(s=>s.id!=='profile'),roles:context.roles,learningPlan:plan,disclosure:'Four separate review passes from one model. Generated suggestions need human review. Known reference IDs and exact quotations are checked; this does not verify every claim. Original skill scores are unchanged.'};
     if(cache.size>=20)cache.delete(cache.keys().next().value);cache.set(hash,{at:clock(),report});events({event:'complete',report});
    }
   }finally{busy=false;}
   res.end();
  }catch(error){const message=error instanceof CloudError?error.message:'Council request failed or timed out. No complete report was produced; use the local atlas.';if(streaming){events({event:'error',error:message});res.end();}else send(res,error instanceof CloudError?error.status:502,{error:message});}
  return true;
 };
}
