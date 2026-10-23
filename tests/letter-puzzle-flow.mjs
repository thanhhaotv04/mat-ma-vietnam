import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fresh} from '../dist/core.mjs';
import {puzzleWords} from '../dist/letter-puzzle.mjs';
const names=JSON.parse(readFileSync('dist/landmark-names.json'));
const b=await chromium.launch(),errors=[];
for(const [width,id,rid] of [[375,'an-giang-2','an-giang'],[1440,'ha-noi-2','ha-noi']]){
 const p=await b.newPage({viewport:{width,height:1000}});p.on('pageerror',e=>errors.push(e.message));
 await p.route('**/firebase-config.json',r=>r.fulfill({status:404,body:'{}'}));
 await p.addInitScript(s=>localStorage.setItem('mat-ma-viet-nam-player-v1',JSON.stringify(s)),fresh('Test',rid));
 await p.goto('http://localhost:4173');await p.locator(`.card-row[data-card="${id}"]`).click();
 await expect(p.locator('[data-letter]').first()).toBeEnabled();
 assert.equal(await p.locator('.answers').count(),0);
 assert.equal(await p.locator('#quiz-hint-content').count(),0);
 assert.equal(await p.locator('.letter-word').count(),puzzleWords(names[id]).length);
 await p.locator('[data-letter]').first().click();await p.locator('[data-slot="0"]').click();
 assert.equal(await p.locator('.letter-slot').first().innerText(),'');
 if(width===375){
  const wrong=puzzleWords(names[id]).flat();[wrong[0],wrong[1]]=[wrong[1],wrong[0]];
  for(const letter of wrong){const buttons=p.locator('[data-letter]:enabled');for(let i=0;i<await buttons.count();i++)if((await buttons.nth(i).innerText()).toLowerCase()===letter.toLowerCase()){await buttons.nth(i).click();break;}}
  await p.locator('#check-letters').click();
  if(await p.locator('#answer-feedback .incorrect').count()){
   for(let i=0;i<await p.locator('[data-slot]').count();i++)await p.locator(`[data-slot="${i}"]`).click();
  }else throw Error('Unexpected random correct ordering');
 }
 await p.screenshot({path:`artifacts/letter-question-${width}.png`});
 for(const letter of puzzleWords(names[id]).flat()){
  const buttons=p.locator('[data-letter]:enabled');let found=false;
  for(let i=0;i<await buttons.count();i++)if((await buttons.nth(i).innerText()).toLowerCase()===letter.toLowerCase()){await buttons.nth(i).click();found=true;break;}
  assert(found,letter);
 }
 await p.locator('#check-letters').click();await expect(p.locator('.reward-art')).toBeVisible();
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await p.screenshot({path:`artifacts/letters-${width}.png`});await p.close();
}
const p=await b.newPage();await p.route('**/firebase-config.json',r=>r.fulfill({status:404,body:'{}'}));await p.addInitScript(s=>localStorage.setItem('mat-ma-viet-nam-player-v1',JSON.stringify(s)),fresh('Test','ha-noi'));await p.goto('http://localhost:4173');await p.locator('[data-tab="food"]').click();await p.locator('.card-row').first().click();await expect(p.locator('.answers button').first()).toBeEnabled();assert.equal(await p.locator('.answers button').count(),4);assert.equal(await p.locator('#letter-puzzle').count(),0);await b.close();assert.deepEqual(errors,[]);console.log('PASS letters, grouped words, return tiles, reward, mobile, food MC');
