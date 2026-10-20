import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {makeQuestion,distractors} from '../dist/questions.mjs';
import {normalize} from '../dist/core.mjs';
const data=JSON.parse(readFileSync(new URL('../dist/data.json',import.meta.url)));
const fixed=()=>.37;
test('Every card has a cloze paragraph and four distinct, unambiguous answer IDs',()=>{
 for(const c of data.cards){for(const mode of ['clue','image','geo']){const q=makeQuestion(data,c,mode,fixed);assert.equal(q.passage.split('{{blank}}').length,2,c.id);assert.equal(q.options.length,4,c.id);assert.equal(new Set(q.options.map(o=>normalize(o.label))).size,4,c.id);assert.equal(q.options.filter(o=>o.id===q.correct).length,1,c.id);assert(q.hint&&q.explanation&&q.source.startsWith('https://'),c.id);}}
});
test('Food choices contain dish names without regional spoilers or the answer in the passage',()=>{
 for(const c of data.cards.filter(x=>x.type==='food')){
  for(const mode of ['clue','image']){const q=makeQuestion(data,c,mode,fixed);for(const o of q.options)for(const r of data.regions)assert(!normalize(o.label).includes(normalize(r.name)),`${c.id}: ${o.label} leaks ${r.name}`);assert(!normalize(q.passage).includes(normalize(c.answerName)),`Passage leaks ${c.id}`);}
  assert(c.image?.startsWith('assets/cards/'),c.id);
 }
});
test('Bánh tằm bì uses the requested close alternatives and is never mistaken for its regional title',()=>{
 const c=data.cards.find(c=>c.name==='Bánh tằm Ngan Dừa'),q=makeQuestion(data,c,'clue',fixed);
 assert.deepEqual(q.options.map(o=>o.label).sort(),['Bánh tráng nướng','Bánh canh','Bánh tằm bì','Bánh cuốn'].sort());
 assert.equal(q.options.find(o=>o.id===q.correct).label,'Bánh tằm bì');assert(!q.passage.includes('Bạc Liêu'));assert(!q.passage.includes('Ngan Dừa'));
});
test('Authored questions ask a fact, keep an explanation, and shuffle positions',()=>{
 const c=data.cards.find(c=>c.name==='Thành nhà Hồ');assert.equal(makeQuestion(data,c,'clue',fixed).options.find(x=>x.id===c.id).label,'1397');assert(c.question.source.includes('unesco.org'));
 const first=makeQuestion(data,c,'clue',()=>.01).options.map(x=>x.id).join(',');const second=makeQuestion(data,c,'clue',()=>.99).options.map(x=>x.id).join(',');assert.notEqual(first,second);
});
test('Landmark distractors prioritize comparable places',()=>{const c=data.cards.find(c=>c.name==='Chùa Một Cột');const options=distractors(data,c,fixed);assert(options.every(o=>/chùa|đền|miếu|nhà thờ|tòa thánh/i.test(o.label)));});

test('Image questions keep the cultural cloze instead of a generic image prompt',()=>{
 for(const c of data.cards){const image=makeQuestion(data,c,'image',()=>.5),clue=makeQuestion(data,c,'clue',()=>.5);assert.equal(image.passage,clue.passage);assert.equal(image.correct,c.id);assert.equal(image.options.length,4);}
});
