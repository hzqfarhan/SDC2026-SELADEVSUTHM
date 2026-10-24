import {writeFile,mkdir} from 'node:fs/promises';
if(!process.argv.includes('--run-cloud-job')){console.log('This submits one potentially billable model request. Confirm sponsor credits and worker limits, then run: node scripts/smoke-cloud.mjs --run-cloud-job');process.exit(0);}
const app=process.env.CLOUD_APP_URL??'http://127.0.0.1:3000',url=new URL(app);
if(url.protocol!=='https:'&&!['localhost','127.0.0.1'].includes(url.hostname))throw Error('Use HTTPS or local development.');
const response=await fetch(new URL('/api/semantic-match',url),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({syntheticConfirmed:true,text:'A fictional learner analyses public datasets with spreadsheets, practises SQL and explains reports to a community learning team.',accessCode:process.env.CLOUD_ACCESS_CODE??''}),signal:AbortSignal.timeout(110000)});
const result=await response.json();if(!response.ok)throw Error(result.error??'Cloud verification failed.');
if(result.schemaVersion!==1||!Array.isArray(result.roles)||result.roles.length!==6||!['cpu','cuda'].includes(result.device))throw Error('Unexpected cloud receipt.');
await mkdir('submission-evidence/runpod',{recursive:true});
const receipt={recordedAt:new Date().toISOString(),appOrigin:url.origin,syntheticFixture:true,...result};
await writeFile('submission-evidence/runpod/latest-completion.json',JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify({completed:true,device:result.device,model:result.model,revision:result.revision,cached:result.cached,receipt:'submission-evidence/runpod/latest-completion.json'},null,2));
