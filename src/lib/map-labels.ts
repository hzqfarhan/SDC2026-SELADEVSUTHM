export type LabelCandidate={id:string;x:number;y:number;priority:number};
export type LabelPlacement=LabelCandidate&{left:number;top:number;width:number;height:number};
export function arrangeMapLabels(candidates:LabelCandidate[],width:number,height:number):LabelPlacement[]{
 const placed:LabelPlacement[]=[];const w=Math.min(204,width-20),h=62;
 if(w<100||height<140)return placed;
 for(const p of [...candidates].sort((a,b)=>b.priority-a.priority||a.id.localeCompare(b.id))){
  if(p.x<0||p.x>width+255||p.y<0||p.y>height)continue;
  for(const [dx,dy] of [[16,-76],[-w-16,-76],[16,18],[-w-16,18],[-w/2,-145],[-w/2,85]]){
   const left=Math.max(10,Math.min(width-w-10,p.x+dx)),top=Math.max(52,Math.min(height-h-16,p.y+dy));
   if(placed.some(r=>left<r.left+r.width+10&&left+w+10>r.left&&top<r.top+r.height+10&&top+h+10>r.top))continue;
   placed.push({...p,left,top,width:w,height:h});break;
  }
  if(placed.length>=8)break;
 }
 return placed;
}
