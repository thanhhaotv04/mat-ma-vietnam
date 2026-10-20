import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {restore,access} from '../dist/core.mjs';
const data=JSON.parse(readFileSync('dist/data.json'));
test('Food assignments use historical regions and exclude the unverified dish',()=>{const cake=data.cards.find(c=>c.id==='can-tho-3');assert.equal(cake.name,'Bánh cống Đại Tâm');assert.equal(cake.region,'soc-trang');assert(data.regions.find(r=>r.id==='soc-trang').cards.includes(cake.id));assert(!data.regions.find(r=>r.id==='can-tho').cards.includes(cake.id));assert.equal(data.cards.filter(c=>c.region==='can-tho'&&c.type==='food').length,0);assert(!data.cards.some(c=>c.id==='soc-trang-4'));for(const c of data.cards.filter(c=>c.type==='food')){assert(c.reviewed);assert(!c.source.includes('search='));}});
test('Retiring editorial content preserves valid progress in existing saves',()=>{const result=restore(data,JSON.stringify({version:1,name:'A',starts:['soc-trang'],lastRegion:'soc-trang',earned:['soc-trang-0','soc-trang-4'],shiny:['soc-trang-4']}));assert(result);assert.deepEqual(result.earned,['soc-trang-0']);assert.deepEqual(result.shiny,[]);});
test('49 additional visiting places cover all 34 chapters',()=>{const extra=data.cards.filter(c=>c.visitKind==='checkin');assert.equal(extra.length,49);assert.equal(new Set(extra.map(c=>data.regions.find(r=>r.id===c.region).chapter)).size,34);assert(!extra.some(c=>c.name==='Bãi Xép Phú Yên'));assert(extra.some(c=>c.name==='Đầm Ô Loan'));});

test('An earned card remains accessible after its region is corrected',()=>{const s=restore(data,JSON.stringify({version:1,name:'A',starts:['can-tho'],lastRegion:'can-tho',earned:['can-tho-3']}));assert(access(data,s).regions.has('soc-trang'));});

test('World Heritage badges follow the inscribed property, including Hue tombs and excluding Sam Son rocks',()=>{for(const id of ['hue-visit-lang-tu-duc','hue-visit-lang-khai-dinh','hue-1','ha-noi-extra-4'])assert(data.cards.find(c=>c.id===id).heritage?.source.startsWith('https://whc.unesco.org/'));assert(!data.cards.find(c=>c.id==='thanh-hoa-extra-5').heritage);});
