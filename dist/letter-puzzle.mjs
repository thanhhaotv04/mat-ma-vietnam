// Each accented Vietnamese letter occupies its own tile.
export function puzzleWords(name){
 return (name.normalize('NFC').match(/[\p{L}\p{N}]+/gu)||[]).map(word=>Array.from(word==='ATK'?word:word[0].toLocaleUpperCase('vi')+word.slice(1).toLocaleLowerCase('vi')));
}
export function fixedInitials(words){
 const fixed=[];let offset=0;
 for(const word of words){if(words.length>=4)fixed.push(offset);offset+=word.length;}
 return fixed;
}
export function hintWords(words,level){
 return words.map(word=>word.map((letter,i)=>level>=3||i===0||(level>=2&&i===word.length-1)?letter:'□'));
}

export function shinyEligible(type,attempts,elapsed,added,hintsUsed=0){return added&&attempts===0&&hintsUsed===0&&elapsed<(type==='landmark'?10000:3000);}

// Reserve hinted letters first, returning conflicting player tiles to the bank.
export function applyHints(q){
 const expected=q.words.flat(),old=[...q.slots],used=new Set();
 q.fixed=hintWords(q.words,q.hintLevel).flat().flatMap((letter,i)=>letter==='□'?[]:[i]);
 q.slots=Array(expected.length).fill(undefined);
 for(const i of q.fixed){const tile=old[i];if(tile!==undefined&&q.letters[tile]===expected[i]&&!used.has(tile)){q.slots[i]=tile;used.add(tile);}}
 for(const i of q.fixed){if(q.slots[i]!==undefined)continue;const tile=q.letters.findIndex((letter,j)=>letter===expected[i]&&!used.has(j));q.slots[i]=tile;used.add(tile);}
 for(let i=0;i<old.length;i++){if(q.slots[i]===undefined&&old[i]!==undefined&&!used.has(old[i])){q.slots[i]=old[i];used.add(old[i]);}}
}
