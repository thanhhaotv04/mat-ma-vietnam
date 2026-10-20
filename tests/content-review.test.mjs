import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {restore,access} from '../dist/core.mjs';
const data=JSON.parse(readFileSync('dist/data.json'));
test('Food assignments use historical regions and exclude the unverified dish',()=>{const cake=data.cards.find(c=>c.id==='can-tho-3');assert.equal(cake.name,'Bánh cống Đại Tâm');assert.equal(cake.region,'soc-trang');assert(data.regions.find(r=>r.id==='soc-trang').cards.includes(cake.id));assert(!data.regions.find(r=>r.id==='can-tho').cards.includes(cake.id));assert.equal(data.cards.filter(c=>c.region==='can-tho'&&c.type==='food').length,0);assert(!data.cards.some(c=>c.id==='soc-trang-4'));for(const c of data.cards.filter(c=>c.type==='food')){assert(c.reviewed);assert(!c.source.includes('search='));}});
test('Retiring editorial content preserves valid progress in existing saves',()=>{const result=restore(data,JSON.stringify({version:1,name:'A',starts:['soc-trang'],lastRegion:'soc-trang',earned:['soc-trang-0','soc-trang-4'],shiny:['soc-trang-4']}));assert(result);assert.deepEqual(result.earned,['soc-trang-0']);assert.deepEqual(result.shiny,[]);});
test('55 additional visiting places cover all 34 chapters',()=>{const extra=data.cards.filter(c=>c.visitKind==='checkin');assert.equal(extra.length,55);assert.equal(new Set(extra.map(c=>data.regions.find(r=>r.id===c.region).chapter)).size,34);assert(!extra.some(c=>c.name==='Bãi Xép Phú Yên'));assert(extra.some(c=>c.name==='Đầm Ô Loan'));});

test('An earned card remains accessible after its region is corrected',()=>{const s=restore(data,JSON.stringify({version:1,name:'A',starts:['can-tho'],lastRegion:'can-tho',earned:['can-tho-3']}));assert(access(data,s).regions.has('soc-trang'));});

test('World Heritage badges follow the inscribed property, including Hue tombs and excluding Sam Son rocks',()=>{for(const id of ['hue-visit-lang-tu-duc','hue-visit-lang-khai-dinh','hue-1','ha-noi-extra-4'])assert(data.cards.find(c=>c.id===id).heritage?.source.startsWith('https://whc.unesco.org/'));assert(!data.cards.find(c=>c.id==='thanh-hoa-extra-5').heritage);});

test('Historical prisons have distinct cards in their historic regions and preserve existing IDs',()=>{
 for(const [name,id,region] of [['Nhà tù Côn Đảo','ba-ria---vung-tau-visit-con-dao','ba-ria---vung-tau'],['Nhà tù Hỏa Lò','ha-noi-visit-nha-tu-hoa-lo','ha-noi'],['Nhà tù Phú Quốc','kien-giang-visit-nha-tu-phu-quoc','kien-giang'],['Nhà tù Sơn La','son-la-2','son-la']]){
  const matches=data.cards.filter(c=>c.name===name);assert.equal(matches.length,1);const c=matches[0];assert.equal(c.id,id);assert.equal(c.region,region);assert(c.reviewed);assert(c.question?.passage.includes('{{blank}}'));assert.equal(c.question.options[c.question.answer],name);assert(!c.heritage);
  const s=restore(data,JSON.stringify({version:1,name:'A',starts:[region],lastRegion:region,earned:[id],shiny:[id]}));assert(s.earned.includes(id));assert(s.shiny.includes(id));
 }
});


test('New regional foods keep generic answer names and sourced individual illustrations',()=>{for(const [id,region,answer] of [['ha-noi-food-banh-cuon-thanh-tri','ha-noi','Bánh cuốn'],['hue-food-banh-khoai','hue','Bánh khoái'],['khanh-hoa-food-bun-sua-nha-trang','khanh-hoa','Bún sứa'],['tay-ninh-food-banh-canh-trang-bang','tay-ninh','Bánh canh']]){const c=data.cards.find(c=>c.id===id);assert.equal(c.region,region);assert.equal(c.answerName,answer);assert(c.reviewed&&c.source.startsWith('https://'));assert(c.image.endsWith(id+'.webp'));}});
