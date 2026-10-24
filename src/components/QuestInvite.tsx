'use client';
import Link from 'next/link';
import {ArrowUpRight,Gamepad2,Trophy,Compass} from 'lucide-react';

export default function QuestInvite({onPlay}:{onPlay?:()=>void}) {
 const content=<><div className="quest-promo-copy"><span className="quest-promo-kicker"><Gamepad2 size={15}/> EXTRA WORLD · ATLAS QUEST</span><h2>Your next move is an adventure.</h2><p>Explore a low-poly island. Solve five challenges. Collect badges and build your explorer passport.</p><span className="quest-promo-cta">Play Atlas Quest <ArrowUpRight size={17}/></span><small>Short challenges · saved progress · no account</small></div><div className="quest-promo-art" aria-hidden="true"><i className="promo-orbit"/><div className="promo-island"><span className="promo-gem">✦</span><i/><i/><i/></div><span className="promo-badge one"><Trophy size={24}/></span><span className="promo-badge two"><Compass size={24}/></span><span className="promo-label">EXPLORE. LEARN. UNLOCK.</span></div></>;
 return onPlay?<button className="quest-promo" onClick={onPlay}>{content}</button>:<Link className="quest-promo" href="/atlas/?module=quest">{content}</Link>;
}
