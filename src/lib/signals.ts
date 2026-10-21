import {roles,skills,type SkillId} from './catalogue';
export type SignalWeights=Partial<Record<SkillId,number>>;
export type ResearchRecord={title:string;url:string;published:string;authors:string[]};
const signalTerms:Record<SkillId,string[]>={data:['data','analytics','analysis'],sql:['sql','database'],python:['python','programming','software','developer'],ai:['ai','llm','generative','artificial intelligence'],communication:['knowledge','writing','communication','interpreting'],critical:['evaluation','research','reasoning','analysis'],sustainability:['environmental','energy','climate','agriculture','sustainability'],project:['management','operations','governance'],design:['design','human','accessibility'],security:['security','privacy','governance','compliance']};
export function researchSignals(items:ResearchRecord[]){
 const seen=new Set<string>();
 const valid=items.filter(p=>{if(seen.has(p.url)||!/^https:\/\/arxiv\.org\/abs\//.test(p.url)||!Number.isFinite(Date.parse(p.published)))return false;seen.add(p.url);return true;});
 const evidence=skills.map(s=>{const matches=valid.filter(p=>signalTerms[s.id].some(t=>new RegExp(`\\b${t}\\b`,'i').test(p.title)));return {id:s.id,sources:matches,strength:valid.length?matches.length/valid.length:0};});
 return {weights:Object.fromEntries(evidence.map(s=>[s.id,s.strength])) as SignalWeights,evidence,count:valid.length};
}
const stop=new Set('a an the i to and or of in with for on my is are as at by from it this that'.split(' '));
const tokens=(text:string)=>text.toLowerCase().match(/[a-z][a-z0-9]+/g)?.filter(t=>!stop.has(t))??[];
/** Classical TF-IDF content retrieval fitted on six authored occupational descriptions.
 * It retrieves reference roles; it is not semantic understanding or a trained employability model. */
export function retrieveRoles(narrative:string){
 const docs=roles.map(r=>tokens(`${r.name} ${r.summary} ${r.keywords}`));const vocabulary=[...new Set(docs.flat())];
 const idf=Object.fromEntries(vocabulary.map(t=>[t,Math.log((1+docs.length)/(1+docs.filter(d=>d.includes(t)).length))+1]));
 const vector=(words:string[])=>{const counts=new Map<string,number>();for(const t of words)counts.set(t,(counts.get(t)??0)+1);return vocabulary.map(t=>(counts.get(t)?1+Math.log(counts.get(t)!):0)*idf[t]);};
 const query=vector(tokens(narrative)),norm=(v:number[])=>Math.sqrt(v.reduce((n,x)=>n+x*x,0));const qnorm=norm(query);
 return roles.map((role,i)=>{const v=vector(docs[i]);const denom=qnorm*norm(v);const similarity=denom?query.reduce((n,q,j)=>n+q*v[j],0)/denom:0;return {role,similarity,terms:[...new Set(tokens(narrative).filter(t=>docs[i].includes(t)))]};}).sort((a,b)=>b.similarity-a.similarity||a.role.id.localeCompare(b.role.id));
}
