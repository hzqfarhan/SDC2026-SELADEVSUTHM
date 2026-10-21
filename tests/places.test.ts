import test from 'node:test';
import assert from 'node:assert/strict';
import {places,institutions,mapPosition,displayPosition,placeSnapshot} from '../src/lib/places';
import {inspectObject} from '../src/lib/inspection';
import {samples,roles} from '../src/lib/catalogue';
test('geographic pins retain finite Malaysian coordinates and traceable entity sources',()=>{
 assert.equal(new Set(places.map(p=>p.id)).size,places.length);
 assert.ok(places.filter(p=>p.kind==='university').length>=80);
 for(const p of places){assert.ok(p.longitude>99&&p.longitude<120&&p.latitude>0&&p.latitude<8);assert.equal(new URL(p.source).hostname,'www.wikidata.org');assert.ok(mapPosition(p).every(Number.isFinite));assert.ok(displayPosition(p).every(Number.isFinite));const info=inspectObject(p.id,{mode:'malaysia',profile:samples[0],role:roles[0],year:2030,scenario:'supported',signals:{},rows:[]});assert.ok(info);assert.equal(info.layers.length,3);assert.match(info.layers[2].detail,/Not evidence of accreditation/);}
});
test('MQA directory entries retain state and official provenance without fabricated coordinates',()=>{
 assert.ok(institutions.length>=160);assert.equal(new Set(institutions.map(x=>x.id)).size,institutions.length);
 for(const x of institutions){assert.ok(x.name&&x.state&&x.sources.length);assert.ok(x.sources.every(url=>new URL(url).hostname==='www.mqa.gov.my'));assert.equal('latitude' in x,false);}
 assert.match(placeSnapshot.coverage,/not a guarantee/);
});
test('KL display offsets do not change original coordinates; projection preserves north and east',()=>{
 const twin=places.find(p=>p.model==='twins')!;assert.notDeepEqual(mapPosition(twin),displayPosition(twin));
 const a=mapPosition({longitude:101,latitude:3}),b=mapPosition({longitude:102,latitude:4});assert.ok(b[0]>a[0]);assert.ok(b[2]<a[2]);
});
