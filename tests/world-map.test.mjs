import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {focusChapter,focusArea,mapAreas,worldViewBox,worldMarkup} from '../dist/world-map.mjs';import {fresh,collectionComplete,completed,access} from '../dist/core.mjs';
const d=JSON.parse(readFileSync('dist/data.json')),world=JSON.parse(readFileSync('dist/world-map.json'));
test('World silhouettes include all chapters and offshore island groups',()=>{assert.equal(world.features.length,34);assert.equal(world.coordinateSpace,'reference-svg-plane');for(const name of ['QĐ. Hoàng Sa','QĐ. Trường Sa','Côn Đảo','Phú Quốc'])assert(world.labels.some(l=>l.name===name));for(const id of ['da-nang','khanh-hoa']){const f=world.features.find(f=>f.id===id);assert.equal(f.geometry.type,'MultiPolygon');assert(f.geometry.coordinates.length>10);}});
test('Opening each chapter focuses its mainland and all adjacent chapters',()=>{for(const ch of d.chapters){const f=focusChapter(world,d,ch.id),vb=worldViewBox(world,f.zoom,f.pan);for(const id of [ch.id,...ch.neighbors]){const [x,y,r,b]=world.features.find(f=>f.id===id).mainlandBounds;assert(x>=vb[0]-.01&&y>=vb[1]-.01&&r<=vb[0]+vb[2]+.01&&b<=vb[1]+vb[3]+.01,ch.id+' focus '+id);}}});
test('SVG exposes 34 keyboard-selectable chapters and real island outlines',()=>{const s=worldMarkup(world,d,fresh('A','ha-noi'),'ha-noi',1,[0,0]);assert.equal((s.match(/data-chapter=/g)||[]).length,34);assert(s.includes('QĐ. Hoàng Sa'));assert(s.includes('QĐ. Trường Sa'));});
test('Three geographic areas partition all 34 current chapters and focus their mainland',()=>{
 assert.deepEqual(mapAreas.map(a=>[a.name,a.chapters.length]),[['Miền Bắc',15],['Miền Trung',11],['Miền Nam',8]]);
 assert.deepEqual(mapAreas.flatMap(a=>a.chapters).sort(),d.chapters.map(c=>c.id).sort());
 assert(mapAreas[1].chapters.includes('lam-dong'));assert(mapAreas[1].chapters.includes('gia-lai'));assert(mapAreas[1].chapters.includes('dak-lak'));
 for(const area of mapAreas){const focus=focusArea(world,area.id),vb=worldViewBox(world,focus.zoom,focus.pan);if(area.id==='central'){const center=world.features.find(f=>f.id==='da-nang').center;assert(Math.abs(vb[0]+vb[2]/2-center[0])<1e-8);assert(Math.abs(vb[1]+vb[3]/2-center[1])<1e-8);assert(focus.zoom>=3);continue;}for(const id of area.chapters){const [x,y,r,b]=world.features.find(f=>f.id===id).mainlandBounds;assert(x>=vb[0]&&y>=vb[1]&&r<=vb[0]+vb[2]&&b<=vb[1]+vb[3]);}}
});
test('Green requires every landmark and food card, independently of route unlock',()=>{
 const r=d.regions.find(r=>r.id==='ha-noi'),s=fresh('A',r.id),cards=d.cards.filter(c=>c.region===r.id);
 s.earned=r.cards.slice(0,3);assert(completed(d,s,r.id));assert(access(d,s).chapters.size>1);assert(!collectionComplete(d,s,[r.id]));
 for(const type of ['food','landmark']){const missing=cards.find(c=>c.type===type);s.earned=r.cards.filter(id=>id!==missing.id);assert(!collectionComplete(d,s,[r.id]),type);}
 s.earned=[...r.cards];assert(collectionComplete(d,s,[r.id]));assert(!collectionComplete(d,s,['missing']));
 const ch=d.chapters.find(c=>c.id==='tp-ho-chi-minh');s.earned=d.regions.find(r=>r.id===ch.regions[0]).cards;assert(!collectionComplete(d,s,ch.regions));s.earned=d.cards.filter(c=>ch.regions.includes(c.region)).map(c=>c.id);assert(collectionComplete(d,s,ch.regions));
});
