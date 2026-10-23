import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {fresh,award} from '../dist/core.mjs';
import {readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync('dist/data.json')),browser=await chromium.launch(),errors=[];
for(const width of [375,1440]){
 const page=await browser.newPage({viewport:{width,height:1000}});page.on('pageerror',e=>errors.push(e.message));
 const state=fresh('Test','lai-chau');award(data,state,'lai-chau-1');award(data,state,'lai-chau-2');
 await page.route('**/firebase-config.json',r=>r.fulfill({status:404,body:'{}'}));await page.addInitScript(s=>localStorage.setItem('mat-ma-viet-nam-player-v1',JSON.stringify(s)),state);
 await page.goto('http://localhost:4173');await page.locator('.card-row[data-card="lai-chau-2"]').click();assert.equal(await page.locator('.card-location').count(),0);await page.locator('.dialog-close').click();const outerFont=await page.locator('.card-row[data-card="lai-chau-1"] .card-title').evaluate(el=>({family:getComputedStyle(el).fontFamily,weight:getComputedStyle(el).fontWeight}));await page.locator('.card-row[data-card="lai-chau-1"]').click();
 await expect(page.locator('.card-name h2')).toHaveText('Đồi chè Tân Uyên');assert.equal(await page.locator('.dialog-content .eyebrow,.detail-intro,.heritage-context').count(),0);
 const title=await page.locator('.card-name h2').evaluate(el=>({font:getComputedStyle(el).fontFamily,size:parseFloat(getComputedStyle(el).fontSize),fits:el.scrollHeight<=el.parentElement.clientHeight}));assert(title.font.startsWith('Nunito'));assert.equal(title.font,outerFont.family);assert.equal(await page.locator('.card-name h2').evaluate(el=>getComputedStyle(el).fontWeight),outerFont.weight);assert(title.size>=24);assert(title.fits);await expect(page.locator('.card-location')).toHaveText('Xã Tân Uyên, Lai Châu');const address=await page.locator('.card-location').evaluate(el=>({size:parseFloat(getComputedStyle(el).fontSize),weight:Number(getComputedStyle(el).fontWeight)}));assert(address.size>=20);assert(address.weight>=900);
 await page.locator('#practice').click();assert.equal(await page.locator('dialog h2').evaluate(el=>getComputedStyle(el).fontFamily),outerFont.family);assert.equal(await page.locator('.cloze-passage').evaluate(el=>getComputedStyle(el).fontFamily),outerFont.family);await expect(page.locator('[data-letter]:visible').first()).toBeEnabled();
 const words=['Đồi','Chè','Tân','Uyên'];
 for(const word of words)for(const letter of [...word].slice(1)){const buttons=page.locator('[data-letter]:visible:enabled');let found=false;for(let i=0;i<await buttons.count();i++)if(await buttons.nth(i).innerText()===letter){await buttons.nth(i).click();found=true;break;}assert(found,letter);}
 await page.locator('#check-letters').click();await expect(page.locator('#claim')).toContainText('Quay Lại');assert.equal(await page.locator('.reward-story h3').count(),0);await expect(page.locator('.reward-story p')).not.toBeEmpty();
 const body=await page.locator('.reward-story p').evaluate(el=>({font:getComputedStyle(el).fontFamily,size:parseFloat(getComputedStyle(el).fontSize)}));assert(body.font.startsWith('Nunito'));assert.equal(body.font,outerFont.family);assert.equal(await page.locator('#claim').evaluate(el=>getComputedStyle(el).fontFamily),outerFont.family);assert.equal(await page.locator('.card-location').evaluate(el=>getComputedStyle(el).fontFamily),outerFont.family);assert(body.size>=17);
 await page.screenshot({path:`artifacts/card-type-${width}.png`});await page.close();
}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS consistent Nunito card typography, clean detail, reward intro without heading, Quay Lại, mobile/desktop');
