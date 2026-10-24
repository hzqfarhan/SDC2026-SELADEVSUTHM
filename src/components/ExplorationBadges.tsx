'use client';
import {useEffect,useState} from 'react';
const valid=new Set(['overview','skills','trends','careers','learning','sdg','simulator','malaysia','evidence','quest']);
export default function ExplorationBadges({mode,completed,onOpen}:{mode:string;completed:number;onOpen?:()=>void}){
 const [visited,setVisited]=useState<string[]>([]);
 useEffect(()=>{setVisited(previous=>{let saved:string[]=[];try{const value:unknown=JSON.parse(localStorage.getItem('shiftatlas-visited-v1')??'[]');if(Array.isArray(value))saved=value.filter((item):item is string=>typeof item==='string'&&valid.has(item));}catch{}const next=[...new Set([...saved,...previous,mode])].filter(item=>valid.has(item));try{localStorage.setItem('shiftatlas-visited-v1',JSON.stringify(next));}catch{}return next;});},[mode]);
 const badges=[{name:'World explorer',icon:'✦',earned:visited.length>=4,detail:`${Math.min(4,visited.length)}/4 worlds visited`},{name:'Evidence seeker',icon:'◈',earned:visited.includes('evidence'),detail:visited.includes('evidence')?'Sources & methods explored':'Visit Sources & methods'},{name:'Learning in motion',icon:'✓',earned:completed>0,detail:`${completed} learning steps marked complete`}];
 return <div className="exploration-badges" aria-label="Exploration achievements">{badges.map(b=><div key={b.name} className={`explorer-badge ${b.earned?'earned':''}`} title={b.detail}><span aria-hidden="true">{b.icon}</span><div><b>{b.name}</b><small>{b.earned?'Unlocked · ':''}{b.detail}</small></div></div>)}{onOpen&&<button className="achievement-link" onClick={onOpen}>Play for more badges ↗</button>}<p>Demo milestones · not credentials</p></div>;
}
