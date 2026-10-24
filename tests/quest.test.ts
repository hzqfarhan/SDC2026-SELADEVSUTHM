import test from 'node:test';
import assert from 'node:assert/strict';
import {answerQuest,cleanQuest,freshQuest,questXP,questRank,questStations,clampQuestPosition} from '../src/lib/quest';

test('quest awards one badge and fixed XP only after a correct answer',()=>{
 const start=freshQuest();
 const wrong=answerQuest(start,'evidence',0);
 assert.equal(wrong.correct,false);assert.equal(questXP(wrong.progress),0);
 const earned=answerQuest(start,'evidence',1);
 assert.equal(earned.earned,true);assert.equal(questXP(earned.progress),100);
 assert.equal(earned.progress.equipped,'evidence');
 const repeat=answerQuest(earned.progress,'evidence',1);
 assert.equal(repeat.earned,false);assert.equal(questXP(repeat.progress),100);
});
test('saved quest progress rejects unknown schema, invalid rewards and unearned equipped badges',()=>{
 assert.deepEqual(cleanQuest({version:2,completed:['evidence']}),freshQuest());
 const clean=cleanQuest({version:1,completed:['evidence','evidence','fake',null,'purpose'],color:'red',companion:'cube',equipped:'future',xp:99999});
 assert.deepEqual(clean.completed,['evidence','purpose']);assert.equal(clean.equipped,null);assert.equal(clean.color,'cobalt');assert.equal(clean.companion,'cube');assert.equal(questXP(clean),200);
});
test('all five learning checks can complete once and produce the final exploration rank',()=>{
 let progress=freshQuest();
 for(const station of questStations)progress=answerQuest(progress,station.id,station.answer).progress;
 assert.equal(questXP(progress),500);assert.equal(questRank(progress),'Atlas trailblazer');assert.equal(new Set(progress.completed).size,5);
});
test('game movement remains on the island without distorting an in-bounds destination',()=>{
 assert.deepEqual(clampQuestPosition(2,3),[2,3]);
 const bounded=clampQuestPosition(100,-100);assert.ok(Math.abs(Math.hypot(...bounded)-5.25)<1e-9);
});
