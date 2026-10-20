import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {compactIslands,compactWorld,geometryBounds,lockMarker} from '../dist/map-layout.mjs';
import {focusArea,worldViewBox} from '../dist/world-map.mjs';
const d=JSON.parse(readFileSync('dist/data.json')),world=JSON.parse(readFileSync('dist/world-map.json'));
test('Island insets enlarge mainland without altering canonical geography or mainland GPS pins',()=>{
 for(const chapter of ['da-nang','khanh-hoa']){
  const features=d.regions.filter(r=>r.chapter===chapter),original=JSON.stringify(features),layout=compactIslands(features,[chapter]),bb=geometryBounds(features),small=geometryBounds(layout.features);
  assert.equal(JSON.stringify(features),original);assert.equal(layout.insets.length,1);assert(small[2]-small[0]<(bb[2]-bb[0])*.6);
  const count=fs=>fs.reduce((s,f)=>s+(f.geometry.type==='Polygon'?1:f.geometry.coordinates.length),0);assert.equal(count(features),count(layout.features));
  for(const c of d.cards.filter(c=>c.region===chapter&&c.coordinates&&c.coordinates[0]<109.5&&c.coordinates[1]>11))assert.deepEqual(layout.point(c.region,c.coordinates),c.coordinates,c.name);
  const inset=layout.insets[0],p=[(inset.sourceBounds[0]+inset.sourceBounds[2])/2,(inset.sourceBounds[1]+inset.sourceBounds[3])/2];assert.deepEqual(layout.point(chapter,p),inset.transform(p));
 }
});
test('Central view zooms in around Da Nang at both actual map aspect ratios; island labels retained',()=>{
 const compact=compactWorld(world);assert(compact.bounds[2]<world.bounds[2]*.7);assert(compact.labels.some(l=>l.name==='QĐ. Hoàng Sa'));assert(compact.labels.some(l=>l.name==='QĐ. Trường Sa'));
 for(const aspect of [.53,1.27]){compact.aspect=aspect;const f=focusArea(compact,'central'),vb=worldViewBox(compact,f.zoom,f.pan);assert(Math.abs(vb[2]/vb[3]-aspect)<1e-8);const center=compact.features.find(f=>f.id==='da-nang').center;assert(Math.abs(vb[0]+vb[2]/2-center[0])<1e-8);assert(Math.abs(vb[1]+vb[3]/2-center[1])<1e-8);assert(f.zoom>=3);}
});
test('Map locks are SVG geometry, not font glyphs',()=>{const markup=lockMarker(1,2,.1);assert(markup.includes('class="map-lock"'));assert(markup.includes('<rect'));assert(markup.includes('<path'));assert(!markup.includes('▣'));});
test('Every published pin has a reviewed location source; uncertain points keep their cards without pins',()=>{
 const review=JSON.parse(readFileSync('scripts/coordinate-review.json'));assert(Object.keys(review).length>=94);
 for(const [id,row] of Object.entries(review)){const c=d.cards.find(c=>c.id===id);assert(c,id);if(row.excludePin){assert(!c.coordinates,id);assert(c.pinReviewReason);}else{assert(c.coordinateVerified,id);assert.equal(c.coordinateSource,row.coordinateSource);assert.deepEqual(c.coordinates,row.coordinates);}}
 const pins=d.cards.filter(c=>c.type==='landmark'&&c.coordinates);assert(pins.length>=99);for(const c of pins){assert(c.coordinateVerified);assert(c.coordinateSource.startsWith('https://'));assert(c.coordinates[0]>102&&c.coordinates[0]<118&&c.coordinates[1]>7&&c.coordinates[1]<24);assert.notDeepEqual(c.coordinates,d.regions.find(r=>r.id===c.region).center);}
});
test('Con Dao is compacted for both the current chapter and historic region without changing real coordinates',()=>{
 const fs=d.regions.filter(r=>r.chapter==='tp-ho-chi-minh'),before=JSON.stringify(fs),layout=compactIslands(fs,['ba-ria---vung-tau']);
 assert.equal(JSON.stringify(fs),before);assert.equal(layout.insets.length,1);assert.equal(layout.insets[0].name,'Côn Đảo');
 const a=geometryBounds(fs),b=geometryBounds(layout.features);assert(b[3]-b[1]<a[3]-a[1]);
 const worldLayout=compactWorld(world);assert(worldLayout.labels.some(l=>l.name==='Côn Đảo'));
});
test('Every historic region has at least one source-verified landmark pin',()=>{
 for(const r of d.regions)assert(d.cards.some(c=>c.region===r.id&&c.type==='landmark'&&!c.easterEgg&&c.coordinateVerified&&c.coordinates),r.id);
});
