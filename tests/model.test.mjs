import test from 'node:test';
import assert from 'node:assert/strict';
import {spread, rotate, initial, validate, eventsAt, cycleLength} from '../model.mjs';
test('every legal spread has exactly the requested beats', () => { for (let n=3;n<=16;n++) for(let k=0;k<=n;k++){const a=spread(n,k);assert.equal(a.length,n);assert.equal(a.filter(Boolean).length,k);} });
test('rotation wraps positive, negative and complete revolutions', () => { const a=[true,false,false]; assert.deepEqual(rotate(a,1),[false,true,false]);assert.deepEqual(rotate(a,-1),[false,false,true]);assert.deepEqual(rotate(a,300),a);assert.deepEqual(rotate(a,3),a); });
test('unrelated rings meet again at their least common multiple', () => {const p=initial(); assert.equal(cycleLength(p),40);assert.deepEqual(eventsAt(p,0),eventsAt(p,40));assert.notDeepEqual(eventsAt(p,0),eventsAt(p,5)); });
test('silent rings produce no scheduled events',()=> {const p=initial();p.rings.forEach(r=>r.hits.fill(false));for(let i=0;i<40;i++)assert.deepEqual(eventsAt(p,i),[]);});
test('validated projects are independent and retain hand edits',()=>{const p=initial();p.rings[0].hits[1]=true;const v=validate(JSON.parse(JSON.stringify(p)));v.rings[0].hits[1]=false;assert.equal(p.rings[0].hits[1],true);assert.equal(v.rings[1].steps,5);});
test('malformed projects and scheduling positions are rejected',()=>{for(const p of [null,{}, {...initial(),tempo:Infinity},{...initial(),rings:[]},{...initial(),rings:[{steps:3,hits:[1,0,0],voice:'Wood'}]}])assert.throws(()=>validate(p));assert.throws(()=>eventsAt(initial(),-1));assert.throws(()=>spread(2,2));assert.throws(()=>spread(4,5));});
