import {chromium,expect} from '@playwright/test';import assert from 'node:assert/strict';import {fresh} from '../dist/core.mjs';import {puzzleWords} from '../dist/letter-puzzle.mjs';
const browser=await chromium.launch(),errors=[];
for(const [id,name,max] of [['ha-noi-0','Hồ Hoàn Kiếm',3],['ha-noi-visit-nha-tu-hoa-lo','Nhà Tù Hỏa Lò',2]]){
 const p=await browser.newPage({viewport:{width:375,height:1000}});p.on('pageerror',e=>errors.push(e.message));await p.route('**/firebase-config.json',r=>r.fulfill({status:404,body:'{}'}));await p.addInitScript(s=>localStorage.setItem('mat-ma-viet-nam-player-v1',JSON.stringify(s)),fresh('Test','ha-noi'));await p.clock.install();await p.clock.pauseAt(new Date());await p.goto('http://localhost:4173');await p.locator(`.card-row[data-card="${id}"]`).click();await expect(p.locator('#quiz-hint')).toBeEnabled();assert.equal(await p.locator('#quiz-hint-content').count(),0);
 // Fill arbitrary letters first to exercise hint conflict resolution.
 for(let i=0;i<3;i++)await p.locator('[data-letter]:visible:enabled').first().click();
 const words=puzzleWords(name),flat=words.flat();
 for(let step=1;step<=max;step++){
  await expect(p.locator('#quiz-hint')).toHaveText(`Gợi ý ${step}`);await p.locator('#quiz-hint').click();const level=step+(max===2?1:0);let offset=0;
  for(const word of words){for(let i=0;i<word.length;i++){if(level===3||i===0||(level===2&&i===word.length-1)){await expect(p.locator(`[data-slot="${offset+i}"]`)).toHaveText(word[i]);await expect(p.locator(`[data-slot="${offset+i}"]`)).toBeDisabled();}}offset+=word.length;}
 }
 await expect(p.locator('#quiz-hint')).toBeDisabled();assert.deepEqual(await p.locator('[data-slot]').allTextContents(),flat);await expect(p.locator('#check-letters')).toBeEnabled();await p.screenshot({path:`artifacts/inline-hint-${max}.png`});await p.locator('#check-letters').click();await expect(p.locator('.reward-card')).toBeVisible();assert.equal(await p.locator('.reward-card .shiny').count(),0);await expect(p.locator('.reward-heading')).not.toContainText('Thẻ lấp lánh');assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.close();
}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS inline hints:3/2levels, conflict correction, locked slots, complete answer and award');
