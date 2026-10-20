import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const d=JSON.parse(readFileSync('dist/data.json'));
assert.equal(d.chapters.length,34);assert.equal(d.regions.length,63);
assert.equal(new Set(d.cards.map(c=>c.id)).size,d.cards.length);
for(const r of d.regions){assert(r.cards.length>=3);assert(r.geometry);assert(r.cards.every(id=>d.cards.some(c=>c.id===id&&c.region===r.id)));}
for(const c of d.chapters){assert(c.geometry);assert(c.neighbors.length);for(const n of c.neighbors)assert(d.chapters.find(x=>x.id===n).neighbors.includes(c.id));}
for(const c of d.cards){assert(c.intro&&c.source.startsWith('https://'));assert(d.regions.some(r=>r.id===c.region));}
assert.equal(new Set(d.cards.map(c=>c.image)).size,d.cards.length);
for(const c of d.cards){assert(c.image?.startsWith('assets/cards/'),`Missing individual image ${c.id}`);assert(existsSync('dist/'+c.image),`Missing file ${c.image}`);}
for(const p of ['app.mjs','core.mjs','questions.mjs','sound.mjs','world-map.mjs','map-layout.mjs'])execFileSync(process.execPath,['--check','dist/'+p]);
for(const p of ['index.html','style.css','world-map.json','assets/brand-mark.svg','assets/be-vietnam-pro-semibold.ttf','credits.html'])assert(existsSync('dist/'+p));
console.log(`Build verified: static dist · ${d.chapters.length} chapters · ${d.regions.length} regions · ${d.cards.length} cards`);
