import {readFile} from 'node:fs/promises';
import {createHash,timingSafeEqual} from 'node:crypto';
export const EMBEDDING_MODEL='intfloat/multilingual-e5-base';
export const EMBEDDING_REVISION='d128750597153bb5987e10b1c3493a34e5a4502a';
export class CloudError extends Error{constructor(status,message){super(message);this.status=status;}}
const hash=text=>createHash('sha256').update(text).digest('hex');
const fixedCompare=(a,b)=>timingSafeEqual(createHash('sha256').update(a).digest(),createHash('sha256').update(b).digest());
const json=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(value));};
export function validateInput(body){
 if(!body||body.syntheticConfirmed!==true)throw new CloudError(400,'Confirm this is fictional demonstration text before sending it to cloud services.');
 if(typeof body.text!=='string'||body.text.trim().length<30||body.text.length>2000)throw new CloudError(400,'Use 30 to 2,000 characters of fictional experience.');
 if(typeof body.accessCode!=='string'||body.accessCode.length>128)throw new CloudError(401,'Enter the team demo access code.');
 if(/\b[^\s@]+@[^\s@]+\.[^\s@]+\b|\b(?:\+?\d[\d\s()-]{8,}\d)\b/.test(body.text))throw new CloudError(400,'Remove contact details. Use fictional experience without personal identifiers.');
 return {text:body.text.trim(),accessCode:body.accessCode};
}
export function validateOutput(output,queries,passages){
 if(!output||output.schemaVersion!==1||output.model!==EMBEDDING_MODEL||output.revision!==EMBEDDING_REVISION||!['cuda','cpu'].includes(output.device)||!Number.isFinite(Date.parse(output.generatedAt)))throw new CloudError(502,'The model result is incompatible. Local matching remains available.');
 if(!Array.isArray(output.queryResults)||output.queryResults.length!==queries.length)throw new CloudError(502,'The model result is incomplete.');
 const seen=new Set();
 for(const result of output.queryResults){
  if(!queries.some(q=>q.id===result.id)||seen.has(result.id)||!Array.isArray(result.matches)||result.matches.length!==passages.length)throw new CloudError(502,'The result does not match the trusted catalogue.');
  seen.add(result.id);const ids=new Set();
  for(const match of result.matches){if(!passages.some(p=>p.id===match.id)||ids.has(match.id)||typeof match.similarity!=='number'||!Number.isFinite(match.similarity)||Math.abs(match.similarity)>1.0001)throw new CloudError(502,'The model returned an invalid role or similarity.');ids.add(match.id);}
 }
 return output;
}
async function bodyJSON(req){let chunks=[],bytes=0;for await(const chunk of req){bytes+=chunk.length;if(bytes>12000)throw new CloudError(413,'Request too large.');chunks.push(chunk);}try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new CloudError(400,'Request must contain valid JSON.');}}
export function createCloudGateway({env=process.env,fetchImpl=fetch,clock=()=>Date.now(),loadCatalogue,loadResearch}={}){
 const key=env.RUNPOD_API_KEY??'',endpoint=env.RUNPOD_ENDPOINT_ID??'',accessCode=env.CLOUD_ACCESS_CODE??'';
 const configured=!!key&&/^[a-zA-Z0-9_-]{3,64}$/.test(endpoint)&&accessCode.length>=12;
 const limit=Math.min(50,Math.max(1,Number(env.CLOUD_DAILY_JOB_LIMIT)||20));
 const cache=new Map(),rates=new Map();let busy=false,day='',jobs=0;
 loadCatalogue??=async()=>JSON.parse(await readFile('server-data/semantic-catalogue.json','utf8'));
 loadResearch??=async()=>JSON.parse(await readFile('out/data/research.json','utf8'));
 return async function handle(req,res){
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(!['/api/cloud-status','/api/semantic-match'].includes(pathname))return false;
  const today=new Date(clock()).toISOString().slice(0,10);if(day!==today){jobs=0;day=today;rates.clear();}
  if(pathname==='/api/cloud-status'){
   if(req.method!=='GET'){json(res,405,{error:'Use GET.'});return true;}
   json(res,200,{configured,provider:'RunPod',gateway:'Replit-compatible Node server',model:EMBEDDING_MODEL,revision:EMBEDDING_REVISION,mode:configured?'configured-unverified':'setup-required',accessCodeRequired:true,limits:{characters:2000,remainingJobs:Math.max(0,limit-jobs),dailyJobs:limit,concurrency:1,cacheMinutes:60},disclosure:'Configuration alone does not verify GPU execution. Text leaves the device only on an explicit request.'});return true;
  }
  try{
   if(req.method!=='POST')throw new CloudError(405,'Use POST.');
   const origin=req.headers.origin;if(origin){let supplied;try{supplied=new URL(origin);}catch{throw new CloudError(403,'Origin not permitted.');}if(supplied.host!==req.headers.host||!['http:','https:'].includes(supplied.protocol))throw new CloudError(403,'Only this app may submit a cloud request.');}
   if(!(req.headers['content-type']??'').startsWith('application/json'))throw new CloudError(415,'Use JSON.');
   if(!configured)throw new CloudError(503,'Set a RunPod endpoint, server-side key and demo access code. Local matching is ready now.');
   const input=validateInput(await bodyJSON(req));if(!fixedCompare(input.accessCode,accessCode))throw new CloudError(401,'Incorrect demo access code.');
   const catalogue=await loadCatalogue(),research=await loadResearch(),roles=catalogue.roles;
   if(!Array.isArray(roles)||roles.length!==6||new Set(roles.map(r=>r.id)).size!==6||roles.some(r=>!r.id||!r.name||!r.text||r.text.length>2000||!/^https:\/\/www\.onetonline\.org\/link\/summary\//.test(r.sourceUrl)))throw new CloudError(503,'Rebuild the trusted role catalogue.');
   const papers=(research.items??[]).filter(p=>typeof p.title==='string'&&p.title.length<=1800&&typeof p.url==='string'&&p.url.startsWith('https://arxiv.org/abs/')).slice(0,6);
   const queries=[{id:'profile',text:input.text},...papers.map((p,i)=>({id:`paper-${i}`,text:p.title}))],passages=roles.map(r=>({id:r.id,text:r.text}));
   const cacheKey=hash(JSON.stringify({queries,passages,model:EMBEDDING_MODEL,revision:EMBEDDING_REVISION})),prior=cache.get(cacheKey);
   if(prior&&clock()-prior.at<3600000){json(res,200,{...prior.result,cached:true});return true;}
   const address=req.socket?.remoteAddress??'unknown',attempts=(rates.get(address)??[]).filter(t=>clock()-t<60000);
   if(attempts.length>=3)throw new CloudError(429,'Wait a minute before another cloud request.');
   if(jobs>=limit)throw new CloudError(429,'Demo cloud allowance reached. Local matching remains available.');
   if(busy)throw new CloudError(429,'A cloud request is running. Please wait.');
   rates.set(address,[...attempts,clock()]);busy=true;jobs++;
   try{
    const response=await fetchImpl(`https://api.runpod.ai/v2/${endpoint}/runsync?wait=90000`,{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({input:{schemaVersion:1,queries,passages}}),signal:AbortSignal.timeout(100000)});
    if(!response.ok)throw new CloudError(502,'RunPod could not complete the request. Check the team endpoint and credits.');
    const job=await response.json();
    if(job.status!=='COMPLETED'){
     if(['IN_QUEUE','IN_PROGRESS'].includes(job.status)&&/^[a-zA-Z0-9_-]{1,150}$/.test(job.id??'')){try{await fetchImpl(`https://api.runpod.ai/v2/${endpoint}/cancel/${job.id}`,{method:'POST',headers:{Authorization:`Bearer ${key}`},signal:AbortSignal.timeout(5000)});}catch{}}
     throw new CloudError(504,'Model did not finish in the demo window. Cancellation was requested where possible. Check worker health.');
    }
    const output=validateOutput(job.output,queries,passages),profile=output.queryResults.find(q=>q.id==='profile');
    const ranked=[...profile.matches].sort((a,b)=>b.similarity-a.similarity).map((m,i)=>{const role=roles.find(r=>r.id===m.id);return{id:role.id,name:role.name,sourceUrl:role.sourceUrl,rank:i+1,similarity:Math.round(m.similarity*10000)/10000};});
    const signals=papers.map((p,i)=>{const match=[...output.queryResults.find(q=>q.id===`paper-${i}`).matches].sort((a,b)=>b.similarity-a.similarity)[0];return{paperId:`paper-${i}`,title:p.title,published:p.published,url:p.url,roleId:match.id,similarity:Math.round(match.similarity*10000)/10000};});
    const result={schemaVersion:1,provider:'RunPod',model:output.model,revision:output.revision,device:output.device,generatedAt:output.generatedAt,completedAt:new Date(clock()).toISOString(),cached:false,roles:ranked,signals,disclosure:'Raw cosine similarity ranks the trusted role descriptions. It does not establish proficiency, future demand or employment probability.'};
    if(cache.size>=100)cache.delete(cache.keys().next().value);cache.set(cacheKey,{at:clock(),result});json(res,200,result);
   }finally{busy=false;}
  }catch(error){json(res,error instanceof CloudError?error.status:502,{error:error instanceof CloudError?error.message:'Cloud request failed or timed out. No generated result is shown; local matching remains available.'});}
  return true;
 };
}
