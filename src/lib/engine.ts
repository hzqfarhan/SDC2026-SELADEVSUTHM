import {courses, roles, skills, type Profile, type Role, type SkillId, type Course} from './catalogue';
import type {SignalWeights} from './signals';
export const clamp = (n:number,min=0,max=5) => Number.isFinite(n)?Math.max(min,Math.min(max,n)):min;
export function cleanProfile(raw: unknown, fallback:Profile):Profile {
 const p=(raw && typeof raw==='object'?raw:{}) as Partial<Profile>;
 return {name:typeof p.name==='string'?p.name.slice(0,80):fallback.name,state:typeof p.state==='string'?p.state:fallback.state,narrative:typeof p.narrative==='string'?p.narrative.slice(0,2000):'',hours:clamp(Number(p.hours??fallback.hours),1,40),budget:clamp(Number(p.budget??fallback.budget),0,10000),levels:Object.fromEntries(skills.map(s=>[s.id,clamp(Number(p.levels?.[s.id]??fallback.levels[s.id]))])) as Profile['levels']};
}
export function extractSkills(text:string):{id:SkillId;evidence:string}[] {
 return skills.flatMap(s=>{const term=s.terms.find(t=>new RegExp(`\\b${t}\\b`,'i').test(text));return term?[{id:s.id,evidence:term}]:[];});
}
export function matchRole(profile:Profile, role:Role,signals:SignalWeights={}) {
 const factors=Object.entries(role.requirements).map(([key,target])=>{const id=key as SkillId;const baseWeight=role.weights[id]??1;const signal=clamp(signals[id]??0,0,1);const weight=baseWeight*(1+.25*signal);const have=clamp(profile.levels[id]);return {id,target,have,weight,baseWeight,signal,gap:Math.max(0,target-have),ratio:Math.min(have/target,1)};});
 const totalWeight=factors.reduce((a,f)=>a+f.weight,0);
 const score=Math.round(100*factors.reduce((a,f)=>a+f.ratio*f.weight,0)/totalWeight);
 return {role,score,factors:factors.map(f=>({...f,contribution:100*f.ratio*f.weight/totalWeight})),gaps:factors.filter(f=>f.gap>0).sort((a,b)=>b.gap*b.weight-a.gap*a.weight)};
}
export function rankRoles(profile:Profile,signals:SignalWeights={}){return roles.map(r=>matchRole(profile,r,signals)).sort((a,b)=>b.score-a.score||a.role.id.localeCompare(b.role.id));}
export function learningPlan(profile:Profile,role:Role,signals:SignalWeights={}){
 const match=matchRole(profile,role,signals);const ordered:Course[]=[];const visited=new Set<SkillId>();
 function add(id:SkillId){if(visited.has(id))return;visited.add(id);const c=courses.find(c=>c.skill===id);if(!c)return;for(const p of c.prerequisites){if(profile.levels[p]<2)add(p);}ordered.push(c);}
 match.gaps.forEach(g=>add(g.id));
 let hours=0,cost=0;
 const steps=ordered.map(c=>{hours+=c.hours;cost+=c.cost;return {...c,week:Math.ceil(hours/Math.max(1,profile.hours)),affordable:cost<=profile.budget};});
 return {steps,hours,cost,weeks:Math.ceil(hours/Math.max(1,profile.hours)),withinBudget:cost<=profile.budget};
}
export type Scenario = 'supported'|'accelerated';
export function simulate(profile:Profile,role:Role,scenario:Scenario,year:number,signals:SignalWeights={}){
 const progress=clamp((year-2026)/9,0,1);
 const adoption=(scenario==='supported'?.35:.8)*progress;
 const support=scenario==='supported'?.8:.3;
 // A transparent sensitivity index; these coefficients are hypothetical, not empirical probabilities.
 const readiness=matchRole(profile,role,signals).score;
 const changePressure=Math.round(100*role.taskExposure*adoption);
 const supportedCapacity=Math.round(100*role.augmentation*adoption*support*(.5+.5*readiness/100));
 return {adoption:Math.round(adoption*100),changePressure,supportedCapacity,readiness,range:[Math.max(0,changePressure-15),Math.min(100,changePressure+15)],support};
}
export function exportPlan(profile:Profile,role:Role,signals:SignalWeights={}){const m=matchRole(profile,role,signals),p=learningPlan(profile,role,signals);return `# SHIFTATLAS learning plan\n\nGenerated: ${new Date().toISOString()}\nSample: ${profile.name}\nTarget: ${role.name}\nSkill coverage: ${m.score}% (prototype rubric, not employment probability)\nWeight mode: ${Object.keys(signals).length?'experimental research-topic weights':'baseline authored weights'}\nBudget: RM ${profile.budget}; ${profile.hours} hours/week\nEstimated practice: ${p.hours} hours across ${p.weeks} weeks; listed fees RM ${p.cost}. Connectivity, device, software and optional certificates excluded.\n\n${p.steps.map((c,i)=>`${i+1}. By week ${c.week}: ${c.title} (${c.hours} estimated hours)\n   ${c.url}\n   Evidence: ${c.outcome}`).join('\n\n')}\n\nCourse completion does not verify proficiency. Reassess skills with evidence.\nRole reference: https://www.onetonline.org/link/summary/${role.onet}\nO*NET describes US occupations; local transferability needs validation. All profile data is synthetic.\n`;}
