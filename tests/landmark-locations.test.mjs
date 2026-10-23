import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Locations use current provinces, omit intangible heritage/food and keep sources for communes',()=>{
 const d=JSON.parse(readFileSync('dist/data.json')),locations=JSON.parse(readFileSync('dist/landmark-locations.json'));
 for(const c of d.cards){const l=locations[c.id];if(c.type==='food'||(c.heritage?.kind||'').includes('phi vật thể')){assert.equal(l,undefined);continue;}assert(l?.province);assert(l.source);if(l.commune)assert(/^(Xã|Phường|Đặc khu) /.test(l.commune));assert(l.province.split(' / ').every(name=>/^(Tỉnh|Thành phố) /.test(name)));}
 assert.equal(locations['ha-noi-visit-nha-tu-hoa-lo'].commune,'Phường Cửa Nam');assert.equal(Object.keys(locations).length,262);
 assert.equal(locations['hung-yen-0'].commune,'Phường Phố Hiến');
 assert.equal(locations['hung-yen-2'].commune,'Xã Đại Đồng');
 assert.equal(locations['da-nang-2'].commune,'Xã Bà Nà');
});
