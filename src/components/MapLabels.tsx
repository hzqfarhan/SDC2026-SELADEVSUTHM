'use client';
import {useEffect,useRef,useState} from 'react';
import {useFrame,useThree} from '@react-three/fiber';
import {Html} from '@react-three/drei';
import {GraduationCap,Landmark,ArrowUpRight} from 'lucide-react';
import * as THREE from 'three';
import {displayPosition,type Place} from '@/lib/places';
import {arrangeMapLabels,type LabelPlacement} from '@/lib/map-labels';
import {useSceneMotion} from './SceneMotion';
export default function MapLabels({items,hover,all}:{items:Place[];hover:string|null;all:boolean}){
 const {camera,size,invalidate}=useThree(),motion=useSceneMotion(),last=useRef(0),[layout,setLayout]=useState<LabelPlacement[]>([]);
 useEffect(()=>{last.current=0;invalidate();},[items,hover,all,motion.selected,size.width,size.height,invalidate]);
 useFrame(()=>{const now=performance.now();if(now-last.current<70)return;last.current=now;
  const candidates=items.filter(p=>all||p.kind==='landmark'||p.id===hover||p.id===motion.selected).flatMap(p=>{const point=new THREE.Vector3(...displayPosition(p));point.y+=p.kind==='landmark'?1.1:.15;point.project(camera);if(point.z< -1||point.z>1)return [];return [{id:p.id,x:(point.x+1)*size.width/2,y:(1-point.y)*size.height/2,priority:p.id===motion.selected?100:p.id===hover?90:p.kind==='landmark'?30:10}];});
  const next=arrangeMapLabels(candidates,motion.selected?Math.max(size.width*.52,size.width-255):size.width,size.height);
  setLayout(old=>JSON.stringify(old)===JSON.stringify(next)?old:next);
 });
 return <Html calculatePosition={()=>[0,0]} zIndexRange={[6,6]} style={{pointerEvents:'none',width:size.width,height:size.height}}><div className="map-label-overlay"><svg width={size.width} height={size.height} aria-hidden="true">{layout.map(p=><g key={p.id}><path d={`M${p.x},${p.y} L${Math.max(p.left,Math.min(p.left+p.width,p.x))},${Math.max(p.top,Math.min(p.top+p.height,p.y))}`} className={p.id===motion.selected?'selected':''}/><circle cx={p.x} cy={p.y} r={3}/></g>)}</svg>{layout.map(l=>{const p=items.find(x=>x.id===l.id);if(!p)return null;const Icon=p.kind==='university'?GraduationCap:Landmark;const selected=p.id===motion.selected;return <button key={p.id} className={`map-place-label ${p.kind} ${selected?'selected':''}`} style={{left:l.left,top:l.top,width:l.width,height:l.height}} onClick={()=>motion.pick(p.id)} aria-pressed={selected} title={`${p.name} — select to orbit and inspect its source`}><span className="map-label-icon"><Icon size={17}/></span><span className="map-label-copy"><small>{selected?'SELECTED':p.kind==='university'?'UNIVERSITY':'LANDMARK'}</small><strong>{p.name}</strong></span><ArrowUpRight size={13}/></button>;})}</div></Html>;
}
