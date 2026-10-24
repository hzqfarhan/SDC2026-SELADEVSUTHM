export type QuestModule='skills'|'trends'|'careers'|'learning'|'sdg'|'simulator'|'malaysia'|'evidence';
export type QuestId='evidence'|'geography'|'future'|'learning'|'purpose';
export type QuestStation={id:QuestId;name:string;badge:string;symbol:string;color:string;position:[number,number];question:string;options:string[];answer:number;explanation:string;module:QuestModule;source:{label:string;url:string}};

/** Authored learning checks about this prototype; no proficiency assessment. */
export const questStations:QuestStation[]=[
 {id:'evidence',name:'Evidence Observatory',badge:'Evidence scout',symbol:'◈',color:'#185deb',position:[-3.6,-2.4],question:'A resume mentions Python. What is the next step?',options:['Set the person to advanced automatically','Review the original excerpt and self-assess the level','Treat a keyword as a verified credential'],answer:1,explanation:'A mention is a starting point. The resume flow shows its excerpt for review; the person chooses their actual proficiency.',module:'skills',source:{label:'Inspect the intake method',url:'/atlas/?module=evidence'}},
 {id:'geography',name:'Malaysia Lookout',badge:'Context navigator',symbol:'⌖',color:'#008da9',position:[0,-4.3],question:'The atlas shows a state unemployment rate. What can you conclude?',options:['It describes the state or federal territory aggregate','Every city in that state has exactly that rate','It predicts your chance of getting a job'],answer:0,explanation:'The DOSM snapshot is at state / federal territory level. It does not establish a city rate or an individual employment probability.',module:'malaysia',source:{label:'OpenDOSM: labour force by state',url:'https://open.dosm.gov.my/data-catalogue/lfs_qtr_state'}},
 {id:'future',name:'Future Lighthouse',badge:'Scenario explorer',symbol:'✦',color:'#7742d8',position:[3.6,-2.4],question:'How should you use the two AI adoption scenarios?',options:['Choose the one guaranteed to happen','Read their indices as measured jobs lost','Compare their assumptions and possible consequences'],answer:2,explanation:'These are authored, uncertain scenarios. Their indices help explore assumptions; no probabilities or forecasts are assigned.',module:'simulator',source:{label:'ILO: AI and occupational exposure',url:'https://www.ilo.org/resource/article/how-might-generative-ai-impact-different-occupations'}},
 {id:'learning',name:'Learning Grove',badge:'Path builder',symbol:'↗',color:'#008e6e',position:[3.2,2.4],question:'A learning step depends on a foundation you have not covered. What comes first?',options:['Complete the foundation, then the dependent step','Always take the most expensive course','Skip every prerequisite to finish faster'],answer:0,explanation:'Learning Islands orders relevant foundations before dependent skills and estimates a plan using the selected weekly time.',module:'learning',source:{label:'Inspect the learning-plan method',url:'/atlas/?module=evidence'}},
 {id:'purpose',name:'Purpose Pavilion',badge:'Purpose connector',symbol:'◎',color:'#d88a00',position:[-3.2,2.4],question:'What does a role-to-SDG connection in this atlas show?',options:['That the United Nations endorses the app','An intended contribution pathway tied to a target','That a measurable SDG outcome has already occurred'],answer:1,explanation:'The pathways are project-authored interpretations. Actual outcomes need measurement and no UN endorsement is implied.',module:'sdg',source:{label:'United Nations: goals and targets',url:'https://sdgs.un.org/goals'}}
];

export type QuestProgress={version:1;completed:QuestId[];color:'cobalt'|'coral'|'emerald';companion:'orb'|'cube';equipped:QuestId|null};
export const freshQuest=():QuestProgress=>({version:1,completed:[],color:'cobalt',companion:'orb',equipped:null});
export function cleanQuest(value:unknown):QuestProgress{
 const fresh=freshQuest();
 if(!value||typeof value!=='object'||Array.isArray(value))return fresh;
 const input=value as Record<string,unknown>;
 if(input.version!==1)return fresh;
 const ids=new Set(questStations.map(s=>s.id));
 const completed=Array.isArray(input.completed)?[...new Set(input.completed.filter((id):id is QuestId=>typeof id==='string'&&ids.has(id as QuestId)))]:[];
 return {version:1,completed,color:input.color==='coral'||input.color==='emerald'?input.color:'cobalt',companion:input.companion==='cube'?'cube':'orb',equipped:typeof input.equipped==='string'&&completed.includes(input.equipped as QuestId)?input.equipped as QuestId:null};
}
export function answerQuest(progress:QuestProgress,id:QuestId,answer:number):{progress:QuestProgress;correct:boolean;earned:boolean}{
 const station=questStations.find(s=>s.id===id);
 if(!station||station.answer!==answer)return {progress,correct:false,earned:false};
 if(progress.completed.includes(id))return {progress,correct:true,earned:false};
 return {progress:{...progress,completed:[...progress.completed,id],equipped:progress.equipped??id},correct:true,earned:true};
}
export const questXP=(progress:QuestProgress)=>progress.completed.length*100;
export const questRank=(progress:QuestProgress)=>progress.completed.length===5?'Atlas trailblazer':progress.completed.length>=3?'World navigator':progress.completed.length>=1?'Curious explorer':'New explorer';
export function clampQuestPosition(x:number,z:number):[number,number]{const length=Math.hypot(x,z);return length>5.25?[x/length*5.25,z/length*5.25]:[x,z];}
