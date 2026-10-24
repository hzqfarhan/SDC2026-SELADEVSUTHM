'use client';
import {createContext,useContext,type RefObject} from 'react';
/** Keep Three's HTML annotations outside the canvas wrapper React reconciles. */
export const SceneLabelPortal=createContext<RefObject<HTMLDivElement|null>|undefined>(undefined);
// Canvas mounts its scene after the sibling overlay ref has been assigned.
export const useLabelPortal=()=>useContext(SceneLabelPortal) as RefObject<HTMLElement>|undefined;
