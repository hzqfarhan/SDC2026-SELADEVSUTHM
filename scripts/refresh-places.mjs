// Requires Python 3 and beautifulsoup4 for the MQA HTML table parser.
import {mkdir,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
await mkdir('.map-source',{recursive:true});
async function save(url,file){const r=await fetch(url,{signal:AbortSignal.timeout(55000)});if(!r.ok)throw Error(`HTTP ${r.status}: ${url}`);const text=await r.text();await writeFile(`.map-source/${file}`,text);return text;}
await save('https://www.mqa.gov.my/mqr/akrbyipta.cfm','mqa-0.html');
const first=await save('https://www.mqa.gov.my/mqr/akrbyipts.cfm','mqa-1.html');
const last=Math.max(1,...[...first.matchAll(/StartRow=(\d+)/gi)].map(m=>Number(m[1])));
if(last>1000)throw Error('Unexpected pagination; inspect the source before refreshing.');
const pages=new Set([last]);for(let start=26;start<last;start+=25)pages.add(start);
for(const start of [...pages].filter(n=>n>1).sort((a,b)=>a-b))await save(`https://www.mqa.gov.my/mqr/akrbyipts.cfm?StartRow=${start}`,`mqa-private-${start}.html`);
const query='SELECT ?item ?itemLabel ?coord WHERE { ?item wdt:P17 wd:Q833; wdt:P31/wdt:P279* wd:Q3918; wdt:P625 ?coord. SERVICE wikibase:label { bd:serviceParam wikibase:language "en,ms". }}';
await save('https://query.wikidata.org/sparql?format=json&query='+encodeURIComponent(query),'universities-wikidata.json');
await save('https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q83063|Q745016|Q7969454|Q822518|Q60967&props=claims|labels&languages=en&format=json','landmarks-wikidata.json');
const run=spawnSync('python',['scripts/build-map-data.py'],{stdio:'inherit'});if(run.status!==0)throw Error('Source parser failed; inspect downloaded source pages.');
