import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const d=JSON.parse(readFileSync('dist/data.json'));
assert.equal(d.chapters.length,34);assert.equal(d.regions.length,63);
assert.equal(new Set(d.cards.map(c=>c.id)).size,d.cards.length);
const questionReview=JSON.parse(readFileSync('scripts/question-review.json'));
for(const c of d.cards){assert(questionReview[c.id],`Question requires editorial review: ${c.id}`);assert.deepEqual(c.question,questionReview[c.id].question);assert.equal(c.question.options.length,4);assert(Number.isInteger(c.question.answer)&&c.question.answer>=0&&c.question.answer<4);}

for(const r of d.regions){assert(r.cards.length>=3);assert(r.geometry);assert(r.cards.every(id=>d.cards.some(c=>c.id===id&&c.region===r.id)));}
for(const c of d.chapters){assert(c.geometry);assert(c.neighbors.length);for(const n of c.neighbors)assert(d.chapters.find(x=>x.id===n).neighbors.includes(c.id));}
for(const c of d.cards){assert(c.intro&&c.source.startsWith('https://'));assert(d.regions.some(r=>r.id===c.region));}
assert.equal(new Set(d.cards.map(c=>c.image)).size,d.cards.length);
for(const c of d.cards){assert(c.image?.startsWith('assets/cards/'),`Missing individual image ${c.id}`);assert(existsSync('dist/'+c.image),`Missing file ${c.image}`);}
for(const p of ['app.mjs','core.mjs','questions.mjs','sound.mjs','letter-puzzle.mjs','world-map.mjs','map-layout.mjs'])execFileSync(process.execPath,['--check','dist/'+p]);
for(const p of ['index.html','style.css','world-map.json','manifest.webmanifest','assets/app-icons/book-32.png','assets/app-icons/book-180.png','assets/app-icons/book-192.png','assets/app-icons/book-512.png','assets/unesco-logo.svg','assets/be-vietnam-pro-semibold.ttf','credits.html'])assert(existsSync('dist/'+p));
console.log(`Build verified: static dist · ${d.chapters.length} chapters · ${d.regions.length} regions · ${d.cards.length} cards`);

for(const a of JSON.parse(readFileSync('scripts/achievement-art.json')))assert(existsSync('dist/'+a.image),a.id);

const names=JSON.parse(readFileSync('dist/landmark-names.json'));
assert.deepEqual(Object.keys(names).sort(),d.cards.filter(c=>c.type==='landmark').map(c=>c.id).sort());

assert(existsSync('dist/landmark-locations.json'));
