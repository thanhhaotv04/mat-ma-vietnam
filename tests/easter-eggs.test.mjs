import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {fresh,eggRegions,eggUnlocked,eggRelated,collectionComplete,award,restore} from '../dist/core.mjs';
const d=JSON.parse(readFileSync('dist/data.json'));
test('Every secret waits for all ordinary cards in every linked area, without circular dependencies',()=>{
 const eggs=d.cards.filter(c=>c.easterEgg);assert.equal(eggs.length,24);
 for(const c of eggs){const regions=eggRegions(d,c),required=d.cards.filter(x=>!x.easterEgg&&regions.includes(x.region));assert(regions.length>=2,c.name);assert(required.length>0);const s=fresh('A',regions[0]);s.earned=required.slice(0,-1).map(x=>x.id);assert(!eggUnlocked(d,s,c),c.name+' missing one');assert(!award(d,s,c.id),c.name+' cannot claim early');s.earned=required.map(x=>x.id);assert(eggUnlocked(d,s,c),c.name);assert(collectionComplete(d,s,regions));assert(award(d,s,c.id));assert(!award(d,s,c.id));assert.equal(s.earned.filter(id=>id===c.id).length,1);for(const id of regions)assert(eggRelated(d,c,id));}
});
test('Old saves retain converted shared cards without prematurely unlocking them',()=>{
 const c=d.cards.find(c=>c.id==='vinh-long-1');assert(c.easterEgg);const s=fresh('A','vinh-long');s.earned=[c.id];const restored=restore(d,JSON.stringify(s));assert(restored);assert(restored.earned.includes(c.id));assert(!eggUnlocked(d,restored,c));
});
test('Internal links use the two historical regions and invalid requirements fail closed',()=>{
 const c=d.cards.find(c=>c.easterEgg?.requiredRegions?.includes('ben-tre'));assert(c);assert.deepEqual(new Set(eggRegions(d,c)),new Set(['ben-tre','tra-vinh']));const s=fresh('A','ben-tre');s.earned=d.cards.filter(c=>!c.easterEgg).map(c=>c.id);assert(!eggUnlocked(d,s,{easterEgg:{requiredChapters:['not-a-chapter']}}));assert(!eggUnlocked(d,s,{easterEgg:{}}));
});
