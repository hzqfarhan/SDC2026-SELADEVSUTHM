import test from 'node:test';
import assert from 'node:assert/strict';
import {arrangeMapLabels} from '../src/lib/map-labels';
test('dense campus labels stay apart and the selected pin wins space',()=>{
 const pins=Array.from({length:84},(_,i)=>({id:String(i),x:250+i%4,y:230+i%3,priority:i===70?100:10}));
 const labels=arrangeMapLabels(pins,600,500);assert.equal(labels[0].id,'70');assert.ok(labels.length<=8);
 for(const a of labels){assert.ok(a.left>=0&&a.left+a.width<=600&&a.top>=52&&a.top+a.height<=500);for(const b of labels){if(a===b)continue;assert.ok(a.left+a.width<=b.left||b.left+b.width<=a.left||a.top+a.height<=b.top||b.top+b.height<=a.top);}}
});
test('small viewports constrain labels and offscreen candidates are not shown',()=>{
 assert.deepEqual(arrangeMapLabels([{id:'hidden',x:-40,y:200,priority:100}],320,400),[]);
 const labels=arrangeMapLabels([{id:'selected',x:190,y:200,priority:100}],180,400);assert.equal(labels.length,1);assert.ok(labels[0].left+labels[0].width<=180);
});
