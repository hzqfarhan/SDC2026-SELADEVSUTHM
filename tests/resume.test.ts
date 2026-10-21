import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {analyseResume,validateResume,MAX_RESUME_BYTES,readResume} from '../src/lib/resume';
test('resume intake rejects unsupported, empty and oversized files',()=>{
 for(const [name,size] of [['cv.exe',100],['cv.pdf',0],['cv.txt',MAX_RESUME_BYTES+1]] as const)assert.throws(()=>validateResume(name,size));
 for(const name of ['cv.PDF','cv.docx','cv.txt'])assert.doesNotThrow(()=>validateResume(name,100));
});
test('analysis exposes original evidence, deduplicates and never infers proficiency',()=>{
 const result=analyseResume('Built SQL databases.\nSQL reporting and Python scripts.\nEmail administration.');
 assert.deepEqual(result.map(x=>x.id),['sql','python']);
 assert.equal(result[0].evidence,'Built SQL databases.');
 assert.ok(result.every(x=>!('level' in x)));assert.deepEqual(analyseResume('Email support only.'),[]);
});
test('local text parsing accepts synthetic resume and rejects unreadable text',async()=>{
 const fixture=readFileSync('public/data/synthetic-resume.txt','utf8');
 assert.equal(await readResume(new File([fixture],'sample.txt')),fixture);
 await assert.rejects(()=>readResume(new File(['short'],'sample.txt')),/Not enough readable text/);
 assert.ok(analyseResume(fixture).length>=5);
});
test('downloadable raw DOSM dataset matches the snapshot fingerprint',()=>{
 const snapshot=JSON.parse(readFileSync('public/data/labour.json','utf8'));
 assert.equal(createHash('sha256').update(readFileSync('public/data/lfs_qtr_state.csv')).digest('hex'),snapshot.sha256);
 assert.equal(snapshot.rows.length,16);assert.equal(new URL(snapshot.sourceUrl).hostname,'storage.dosm.gov.my');
});

test('DOCX extraction returns plain text from a real zipped document',async()=>{
 const bytes=readFileSync('tests/fixtures/synthetic-resume.docx');
 const text=await readResume(new File([bytes],'synthetic.docx'));
 assert.match(text,/Python and SQL/);assert.ok(!text.includes('<w:'));
});
