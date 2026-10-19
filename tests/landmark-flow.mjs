import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,mkdirSync} from 'node:fs';
const d=JSON.parse(readFileSync('dist/data.json'));
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1050}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:4173');
await page.locator('#player-name').fill('Khám phá');await page.locator('[data-start="ha-noi"]').click();await page.locator('#begin').click();
await page.locator('.card-row[data-card="ha-noi-2"]').click();
await page.locator('.answers button:not([data-answer="ha-noi-2"])').first().click();
assert.equal(await page.locator('dialog[data-view=reward]').count(),0);
await page.locator('[data-answer="ha-noi-2"]').click();
await expect(page.locator('.reward-card h2')).toHaveText('Chùa Một Cột');
await expect(page.locator('.reward-story')).toContainText('1049');assert((await page.locator('.reward-story > p').innerText()).length<=265);
await expect(page.locator('.reward-art .landmark-atlas')).toBeVisible();
const boxes=await page.locator('.reward-card,.reward-story').evaluateAll(els=>els.map(e=>{const b=e.getBoundingClientRect();return {top:b.top,bottom:b.bottom};}));assert(boxes[0].bottom<=boxes[1].top);
mkdirSync('artifacts',{recursive:true});
for(const width of [1440,375]){await page.setViewportSize({width,height:1050});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:`artifacts/landmark-reward-${width}.png`,fullPage:true});}
await page.locator('#claim').click();await page.locator('.card-row[data-card="ha-noi-2"]').click();await expect(page.locator('.detail-intro')).toContainText('1049');await expect(page.locator('.detail-image .landmark-atlas')).toBeVisible();
for(const sheet of [...new Set(d.cards.filter(c=>c.landmarkArt).map(c=>c.landmarkArt.sheet))]){
 const result=await page.evaluate(async sheet=>{const image=new Image();image.src=`assets/landmark-atlas-${sheet}.png`;await image.decode();return image.naturalWidth;},sheet);assert(result>0);
}
assert.deepEqual(errors,[]);await browser.close();console.log('Landmark flow PASS: wrong answer does not reward; correct answer shows image then sourced history; earned card keeps history; desktop/mobile and all atlas images decode.');
