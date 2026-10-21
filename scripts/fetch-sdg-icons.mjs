import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const directory='public/images/sdg';
await mkdir(directory,{recursive:true});
const records=[];
for(let goal=1;goal<=17;goal++){
 const name=`E_SDG_Icons-${String(goal).padStart(2,'0')}.jpg`;
 const source=`https://sdgs.un.org/sites/default/files/goals/${name}`;
 const response=await fetch(source,{signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw Error(`${source}: ${response.status}`);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(bytes[0]!==255||bytes[1]!==216)throw Error(`Not a JPEG: ${source}`);
 await writeFile(`${directory}/${name}`,bytes);
 records.push({goal,file:`/images/sdg/${name}`,source,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
await writeFile(`${directory}/provenance.json`,JSON.stringify({publisher:'United Nations',retrievedAt:new Date().toISOString(),sourcePage:'https://sdgs.un.org/goals',guidelines:'https://www.un.org/sustainabledevelopment/news/communications-material/',modifications:'None; original image bytes retained.',records},null,2)+'\n');
console.log(`Downloaded and verified ${records.length} official SDG JPEG files.`);
