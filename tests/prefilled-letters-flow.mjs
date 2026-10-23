import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {fresh} from '../dist/core.mjs';
import {puzzleWords} from '../dist/letter-puzzle.mjs';
const browser=await chromium.launch(),page=await browser.newPage({viewport:{width:375,height:1000}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));await page.route('**/firebase-config.json',r=>r.fulfill({status:404,body:'{}'}));await page.addInitScript(s=>localStorage.setItem('mat-ma-viet-nam-player-v1',JSON.stringify(s)),fresh('Test','ha-noi'));
await page.goto('http://localhost:4173');await page.locator('.card-row[data-card="ha-noi-visit-nha-tu-hoa-lo"]').click();await expect(page.locator('[data-letter]:visible').first()).toBeEnabled();
assert.deepEqual(await page.locator('.prefilled').allTextContents(),['N','T','H','L']);
for(const el of await page.locator('.prefilled').all())await expect(el).toBeDisabled();
const words=puzzleWords('Nhà tù Hỏa Lò');assert.equal(await page.locator('[data-letter]:visible').count(),words.flat().length-4);
assert.equal(await page.locator('#quiz-hint-content').count(),0);
for(const letter of words.flatMap(w=>w.slice(1))){const buttons=page.locator('[data-letter]:visible:enabled');let found=false;for(let i=0;i<await buttons.count();i++)if(await buttons.nth(i).innerText()===letter){await buttons.nth(i).click();found=true;break;}assert(found,letter);}
await page.screenshot({path:'artifacts/prefilled-long-name.png'});await page.locator('#check-letters').click();await expect(page.locator('.reward-card')).toBeVisible();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.deepEqual(errors,[]);await browser.close();console.log('PASS long name prefilled initials, two hints, separate letters, successful award');
