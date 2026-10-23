import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {puzzleWords,fixedInitials,hintWords,shinyEligible,applyHints} from '../dist/letter-puzzle.mjs';
test('Letters stay separate, with word boundaries and accents',()=>{
 assert.deepEqual(puzzleWords('Hồ Tà Pạ'),[['H','ồ'],['T','à'],['P','ạ']]);
 assert.deepEqual(puzzleWords('Chùa Trường Nghệ'),[['C','h','ù','a'],['T','r','ư','ờ','n','g'],['N','g','h','ệ']]);
 assert.deepEqual(puzzleWords('Đỉnh Mẫu Sơn'),[['Đ','ỉ','n','h'],['M','ẫ','u'],['S','ơ','n']]);
 assert.deepEqual(puzzleWords('Đồi A1'),[['Đ','ồ','i'],['A','1']]);
 assert.deepEqual(puzzleWords('ATK Định Hóa'),[['A','T','K'],['Đ','ị','n','h'],['H','ó','a']]);
 assert.deepEqual(puzzleWords('Sông Hồng'),[['S','ô','n','g'],['H','ồ','n','g']]);
});
test('Every landmark has a reviewed name; food stays outside the letter bank',()=>{
 const d=JSON.parse(readFileSync('dist/data.json')),names=JSON.parse(readFileSync('dist/landmark-names.json'));
 assert.equal(Object.keys(names).length,264);
 for(const c of d.cards){assert.equal(Boolean(names[c.id]),c.type==='landmark');if(names[c.id])assert(puzzleWords(names[c.id]).flat().length>0);}
 assert.equal(names['lang-son-visit-mau-son'],'Đỉnh Mẫu Sơn');
});

test('Shiny thresholds differ by category and require a first correct new award',()=>{
 for(const [type,limit] of [['landmark',10000],['food',3000]]){
  assert.equal(shinyEligible(type,0,limit-1,true),true);
  assert.equal(shinyEligible(type,0,limit,true),false);
  assert.equal(shinyEligible(type,1,100,true),false);
  assert.equal(shinyEligible(type,0,100,false),false);
  for(const hints of [1,2,3])assert.equal(shinyEligible(type,0,100,true,hints),false);
 }
});

test('Title case every word, no clusters, and prefill only names of at least four words',()=>{
 assert.deepEqual(puzzleWords('nghệ NHÀ ngọc CHÙA trà'),[['N','g','h','ệ'],['N','h','à'],['N','g','ọ','c'],['C','h','ù','a'],['T','r','à']]);
 const words=puzzleWords('Nhà tù Hỏa Lò');
 assert.deepEqual(fixedInitials(words),[0,3,5,8]);
 assert.deepEqual(fixedInitials(puzzleWords('Hồ Tà Pạ')),[]);
 assert.deepEqual(hintWords(words,1),[['N','□','□'],['T','□'],['H','□','□'],['L','□']]);
 assert.deepEqual(hintWords(words,2),[['N','□','à'],['T','ù'],['H','□','a'],['L','ò']]);
 assert.deepEqual(hintWords(words,3),words);
});

test('Hints fill answer slots without reusing tiles or losing editable correct letters',()=>{
 const words=puzzleWords('Hồ Tà Pạ'),q={words,letters:words.flat(),slots:[1,0,3,2,5,4],hintLevel:1};
 for(const level of [1,2,3]){q.hintLevel=level;applyHints(q);const tiles=q.slots.filter(x=>x!==undefined);assert.equal(new Set(tiles).size,tiles.length);for(const index of q.fixed)assert.equal(q.letters[q.slots[index]],words.flat()[index]);}
 assert.deepEqual(q.slots.map(i=>q.letters[i]),words.flat());
 const duplicate={words:puzzleWords('Cầu Cả'),letters:['C','ầ','u','C','ả'],slots:[3,1,2,0,4],hintLevel:1};applyHints(duplicate);assert.equal(new Set(duplicate.slots).size,5);assert.deepEqual(duplicate.slots.map(i=>duplicate.letters[i]),duplicate.words.flat());
});
