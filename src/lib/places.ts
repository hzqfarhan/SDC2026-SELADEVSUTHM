import snapshot from '../../public/data/malaysia-places.json';
export type Place={id:string;name:string;longitude:number;latitude:number;source:string;kind:string;model:string};
export const places:Place[]=snapshot.places;
export const institutions=snapshot.institutions;
export const placeSnapshot=snapshot;
export function mapPosition(p:Pick<Place,'longitude'|'latitude'>):[number,number,number]{return [(p.longitude-109)*1.05,1.55,-(p.latitude-4)*1.05];}
/** Display offsets separate neighbouring KL miniatures; leader lines retain true anchors. */
export function displayPosition(p:Place):[number,number,number]{const v=mapPosition(p);const offsets:Record<string,[number,number]>={twins:[-.65,-.45],tower:[.55,-.55],spire:[.35,.65]};const o=offsets[p.model];return o?[v[0]+o[0],v[1],v[2]+o[1]]:v;}
