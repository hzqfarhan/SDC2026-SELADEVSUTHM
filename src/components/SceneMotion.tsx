'use client';
import {createContext,useContext,useEffect,useRef,type ReactNode} from 'react';
import {useFrame,useThree} from '@react-three/fiber';
import {Line} from '@react-three/drei';
import * as THREE from 'three';
import type {Inspection} from '@/lib/inspection';
type MotionState={selected:string|null;expanded:boolean;layer:number;animate:boolean;reduced:boolean;pick:(id:string,point?:[number,number,number])=>void};
export const MotionContext=createContext<MotionState>({selected:null,expanded:false,layer:0,animate:false,reduced:false,pick:()=>{}});
export const useSceneMotion=()=>useContext(MotionContext);
export function SceneEntrance({children}:{children:ReactNode}){const ref=useRef<THREE.Group>(null),progress=useRef(0);const {reduced}=useSceneMotion();useFrame((_,dt)=>{if(!ref.current)return;progress.current=reduced?1:THREE.MathUtils.damp(progress.current,1,7,Math.min(dt,.05));ref.current.position.y=.2-(1-progress.current)*.55;ref.current.scale.setScalar(.93+.07*progress.current);if(progress.current<.999) _.invalidate();});return <group ref={ref}>{children}</group>;}
export function Lift({children,y=0}:{children:ReactNode;y?:number}){const ref=useRef<THREE.Group>(null);const {reduced}=useSceneMotion();useFrame((s,dt)=>{if(!ref.current)return;const current=ref.current.position.y;ref.current.position.y=reduced?y:THREE.MathUtils.damp(current,y,6,Math.min(dt,.05));if(Math.abs(current-y)>.001)s.invalidate();});return <group ref={ref}>{children}</group>;}
export function OrbitAccent({children}:{children:ReactNode}){const ref=useRef<THREE.Group>(null);const {animate}=useSceneMotion();useFrame((_,dt)=>{if(ref.current&&animate)ref.current.rotation.y+=Math.min(dt,.05)*.12;});return <group ref={ref}>{children}</group>;}
export function Beacon({height}:{height:number}){const ref=useRef<THREE.MeshStandardMaterial>(null);const {animate}=useSceneMotion();useFrame(s=>{if(ref.current)ref.current.emissiveIntensity=animate?.6+.3*Math.sin(s.clock.elapsedTime*1.6):.6;});return <mesh position={[0,height+.22,0]}><sphereGeometry args={[.045,8,6]}/><meshStandardMaterial ref={ref} color="#48d8ff" emissive="#24b8f5" emissiveIntensity={.6}/></mesh>;}
export function SelectionHalo({focus}:{focus:Inspection|null}){const ref=useRef<THREE.Group>(null);const {animate,expanded,layer}=useSceneMotion();useFrame((s)=>{if(ref.current)ref.current.scale.setScalar(animate?1+Math.sin(s.clock.elapsedTime*2)*.035:1);});if(!focus)return null;const [x,,z]=focus.position;return <group position={[x,.13,z]}><group ref={ref}><mesh rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.8,.85,48]}/><meshBasicMaterial color="#2bd5ef" transparent opacity={.75} depthWrite={false}/></mesh></group>{expanded&&[0,1,2].map(i=><group key={i} position={[0,.22+i*.43,0]}><mesh rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.93+i*.09,.945+i*.09,48]}/><meshBasicMaterial color={['#3978ff','#28d5ed','#ffb425'][i]} transparent opacity={layer===i?.9:.25} depthWrite={false}/></mesh></group>)}{expanded&&<Line points={[[1.1,.2,0],[1.1,1.3,0]]} color="#51b5e5" dashed dashSize={.08} gapSize={.07}/>}</group>;}
export function CameraJourney({focus,reset,map,onInterrupt,travelRef}:{focus:Inspection|null;reset:number;map:boolean;onInterrupt?:()=>void;travelRef:React.RefObject<boolean>}){
 const {camera,size,controls,invalidate}=useThree();const {reduced,expanded}=useSceneMotion();
 const elapsed=useRef(0),journey=useRef({fromTarget:new THREE.Vector3(),toTarget:new THREE.Vector3(),from:new THREE.Spherical(),to:new THREE.Spherical(),fromZoom:40,toZoom:40,focused:false});
 useEffect(()=>{const ctl=controls as unknown as {target:THREE.Vector3}|null;if(!ctl)return;
  const target=focus?new THREE.Vector3(...focus.position):new THREE.Vector3();if(focus&&!map)target.y=expanded?1.2:focus.position[1];
  const from=new THREE.Spherical().setFromVector3(camera.position.clone().sub(ctl.target));
  const seed=focus?[...focus.id].reduce((n,c)=>n+c.charCodeAt(0),0):0;
  const to=focus?new THREE.Spherical(from.radius,map?.55+(seed%4)*.04:.83+(seed%4)*.045,from.theta+.48+(seed%7)*.045):new THREE.Spherical().setFromVector3(map?new THREE.Vector3(0,13,9):new THREE.Vector3(11,10,13));
  if(!focus)to.theta=from.theta+Math.atan2(Math.sin(to.theta-from.theta),Math.cos(to.theta-from.theta));
  const base=Math.min(map?45:48,size.width/(map?23:16),size.height/12);
  const available=focus?Math.max(size.width*.52,size.width-255):size.width;
  const zoom=focus?Math.min(base*(map?3.5:2.05),available/(focus.viewSpan??(map?3:6)),size.height/(focus.viewSpan?8:5.7),125):base;
  if(focus){const right=new THREE.Vector3(Math.cos(to.theta),0,-Math.sin(to.theta));target.addScaledVector(right,(size.width-available)/2/Math.max(zoom,1));}
  journey.current={fromTarget:ctl.target.clone(),toTarget:target,from,to,fromZoom:(camera as THREE.OrthographicCamera).zoom,toZoom:zoom,focused:!!focus};elapsed.current=0;travelRef.current=true;invalidate();
 },[focus?.id,focus?.position[0],focus?.position[2],reset,map,expanded,size.width,size.height,controls,invalidate,travelRef]);
 useFrame((s,dt)=>{if(!travelRef.current||!(camera instanceof THREE.OrthographicCamera))return;const ctl=controls as unknown as {target:THREE.Vector3;update:()=>void}|null;if(!ctl)return;const d=journey.current;elapsed.current+=Math.min(dt,.05);const p=reduced?1:Math.min(1,elapsed.current/(d.focused?1.45:1));const ease=(v:number)=>v*v*v*(v*(v*6-15)+10);const t=ease(p),z=ease(d.focused?Math.max(0,(p-.23)/.77):p);ctl.target.lerpVectors(d.fromTarget,d.toTarget,t);const spherical=new THREE.Spherical(THREE.MathUtils.lerp(d.from.radius,d.to.radius,t),THREE.MathUtils.lerp(d.from.phi,d.to.phi,t),THREE.MathUtils.lerp(d.from.theta,d.to.theta,t));camera.position.setFromSpherical(spherical).add(ctl.target);camera.zoom=THREE.MathUtils.lerp(d.fromZoom,d.toZoom,z);camera.updateProjectionMatrix();ctl.update();if(p===1){travelRef.current=false;onInterrupt?.();}else s.invalidate();});return null;
}
/** Demand rendering continues only for visible, enabled motion. No background tab loop. */
export function AnimationClock(){const {animate}=useSceneMotion();const {invalidate}=useThree();useEffect(()=>{invalidate();},[animate,invalidate]);useFrame(s=>{if(animate)s.invalidate();});return null;}

export function BackgroundObjects(){const group=useRef<THREE.Group>(null);const {animate}=useSceneMotion();useFrame((_,dt)=>{if(group.current&&animate)group.current.rotation.y+=Math.min(dt,.05)*.018;});return <group ref={group}>{[[-8,-.3,-6],[8,.7,-5],[-7,1.1,6],[8,-.2,6]].map((p,i)=><group key={i} position={p as [number,number,number]} rotation={[.35,i*.7,.35]}><mesh><octahedronGeometry args={[.4+i*.06,0]}/><meshStandardMaterial color={['#185deb','#00a5bc','#e39b00','#6841cf'][i]} roughness={.25} metalness={.18}/></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.8,.018,6,32]}/><meshStandardMaterial color="#9caec5"/></mesh></group>)}</group>;}
