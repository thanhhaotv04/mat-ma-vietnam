import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1050}});
await page.goto('http://localhost:4173');await page.locator('#player-name').fill('Cà Mau');await page.locator('[data-start="ca-mau"]').click();await page.locator('#begin').click();
assert.equal(await page.locator('.region-switcher,.map-key').count(),0);
await page.getByRole('button',{name:'Món ăn',exact:true}).click();await expect(page.locator('.collection-page>h2')).toHaveText('Đặc Sản');
await page.locator('[data-card="ca-mau-3"]').click();await page.locator('[data-answer="ca-mau-3"]').click();
await expect(page.locator('.reward-card h2')).toHaveText('Cua Cà Mau');
async function square(selector){const b=await page.locator(selector).boundingBox();assert(Math.abs(b.width-b.height)<1,`${selector}: ${b.width}×${b.height}`);}
for(const width of [375,768,1024,1440]){await page.setViewportSize({width,height:1050});await square('.reward-art');assert.equal(await page.locator('.reward-art .art').evaluate(e=>getComputedStyle(e).backgroundSize),'400% 400%');}
await page.screenshot({path:'artifacts/crab-reward-desktop.png'});await page.setViewportSize({width:375,height:1050});await page.screenshot({path:'artifacts/crab-reward-mobile.png'});
await page.locator('#claim').click();assert.equal(await page.locator('.card-intro,.card-status,.card-end').count(),0);
for(const width of [375,768,1024,1440]){await page.setViewportSize({width,height:1050});await square('.card-row[data-card="ca-mau-3"] .thumb');}
await page.screenshot({path:'artifacts/crab-collection-desktop.png'});
await page.locator('[data-card="ca-mau-3"]').click();for(const width of [375,1440]){await page.setViewportSize({width,height:1050});await square('.detail-image');}
await browser.close();console.log('Card layout PASS: Cà Mau crab keeps square artwork in reward, collection and detail at four widths; rows only contain art/name; no region buttons or legend; dynamic heading.');
