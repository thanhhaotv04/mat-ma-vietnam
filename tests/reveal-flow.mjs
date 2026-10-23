import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {fresh} from '../dist/core.mjs';
const browser=await chromium.launch(),page=await browser.newPage({viewport:{width:390,height:1000}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.route('**/firebase-config.json',r=>r.fulfill({status:404,body:'{}'}));await page.addInitScript(s=>localStorage.setItem('mat-ma-viet-nam-player-v1',JSON.stringify(s)),fresh('Test','ha-noi'));
await page.clock.install();await page.clock.pauseAt(new Date());await page.goto('http://localhost:4173');
for(const type of ['landmark','food']){
 await page.locator(`[data-tab="${type}"]`).click();await page.locator('.card-row').first().click();
 await expect(page.locator(type==='food'?'.answers button':'[data-letter]')).not.toHaveCount(0);
 await expect(page.locator(type==='food'?'.answers button':'[data-letter]').first()).toBeEnabled();
 assert.equal(await page.locator('[data-tile]').count(),9);assert.equal(await page.locator('.revealed').count(),0);
 const style=await page.locator('[data-tile]').first().evaluate(el=>({duration:getComputedStyle(el).transitionDuration,blur:getComputedStyle(el).backdropFilter,columns:getComputedStyle(el.parentElement).gridTemplateColumns.split(' ').length}));
 assert.equal(style.columns,3);assert(style.duration.split(',').every(x=>x.trim()==='0.5s'));assert.equal(style.blur,'blur(14px)');
 await page.clock.runFor(499);assert.equal(await page.locator('.revealed').count(),0);
 await page.clock.runFor(1);assert.equal(await page.locator('.revealed').count(),1);
 await page.clock.runFor(500);assert.equal(await page.locator('.revealed').count(),2);
 await page.clock.runFor(3500);assert.equal(await page.locator('.revealed').count(),9);
 await page.clock.runFor(500);await page.screenshot({path:`artifacts/reveal-3x3-${type}.png`});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.locator('.dialog-close').click();await page.clock.runFor(1000);
}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: both quiz types use 3x3, one tile each500ms, blur transition500ms, all nine start by4500ms, close cleanup/mobile');
