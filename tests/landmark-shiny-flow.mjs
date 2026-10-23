import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {fresh} from '../dist/core.mjs';
import {puzzleWords} from '../dist/letter-puzzle.mjs';
const browser=await chromium.launch(),errors=[];
for(const [ms,wrong,want] of [[9999,false,true],[10000,false,false],[500,true,false]]){
 const page=await browser.newPage({viewport:{width:390,height:1000}});page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/firebase-config.json',r=>r.fulfill({status:404,body:'{}'}));
 await page.addInitScript(s=>localStorage.setItem('mat-ma-viet-nam-player-v1',JSON.stringify(s)),fresh('Test','ha-noi'));
 await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('http://localhost:4173');
 await page.locator('.card-row[data-card="ha-noi-0"]').click();await expect(page.locator('[data-letter]').first()).toBeEnabled();
 async function fill(tokens){for(const token of tokens){const buttons=page.locator('[data-letter]:enabled');let found=false;for(let i=0;i<await buttons.count();i++)if((await buttons.nth(i).innerText()).toLowerCase()===token.toLowerCase()){await buttons.nth(i).click();found=true;break;}assert(found);}}
 const tokens=puzzleWords('Hồ Hoàn Kiếm').flat();
 if(wrong){const bad=[...tokens];[bad[0],bad[1]]=[bad[1],bad[0]];await fill(bad);await page.locator('#check-letters').click();await expect(page.locator('.incorrect')).toBeVisible();for(let i=0;i<tokens.length;i++)await page.locator(`[data-slot="${i}"]`).click();}
 await fill(tokens);await page.clock.runFor(ms);await page.locator('#check-letters').click();await expect(page.locator('.reward-card')).toBeVisible();assert.equal(await page.locator('.reward-card .shiny').count(),want?1:0);
 if(want){const foil=await page.locator('.reward-card').evaluate(el=>({content:getComputedStyle(el,'::after').content,inset:getComputedStyle(el,'::after').inset,pointer:getComputedStyle(el,'::after').pointerEvents}));assert.equal(foil.content,'""');assert.equal(foil.inset,'0px');assert.equal(foil.pointer,'none');await page.screenshot({path:'artifacts/foil-reward.png'});await page.locator('#claim').click();await expect(page.locator('.card-row[data-card="ha-noi-0"] .shiny')).toHaveCount(1);await page.locator('.card-row[data-card="ha-noi-0"]').click();assert.equal(await page.locator('.detail-card .shiny').count(),1);}
 await page.close();
}
await browser.close();assert.deepEqual(errors,[]);console.log('PASS landmark 9999/10000ms, first attempt only, foil across reward/collection/detail');
