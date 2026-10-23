import {chromium,expect} from '@playwright/test';import assert from 'node:assert/strict';import {fresh} from '../dist/core.mjs';
const browser=await chromium.launch(),errors=[];
for(const width of [375,768,1440]){
 const p=await browser.newPage({viewport:{width,height:1100}});p.on('pageerror',e=>errors.push(e.message));await p.route('**/firebase-config.json',r=>r.fulfill({status:404,body:'{}'}));await p.addInitScript(s=>localStorage.setItem('mat-ma-viet-nam-player-v1',JSON.stringify(s)),fresh('Test','ha-noi'));await p.goto('http://localhost:4173');
 await expect(p.locator('.map-page .map-bookmarks [data-action="world"]')).toHaveCount(1);await expect(p.locator('.collection-page .content-bookmarks [data-tab]')).toHaveCount(4);await expect(p.locator('.map-page [data-tab]')).toHaveCount(0);
 if(width>=768){const left=await p.locator('.map-page').boundingBox(),right=await p.locator('.collection-page').boundingBox(),tabs=await p.locator('.content-bookmarks').boundingBox();assert(Math.abs(left.y-right.y)<1);assert(Math.abs(left.x+left.width-right.x)<1);assert(tabs.x>right.x&&tabs.x<right.x+60);}
 await p.locator('[data-tab="search"]').click();await p.locator('#collection-search').fill('chua');await expect(p.locator('.search-result').first()).toBeVisible();await p.locator('[data-action="world"]').click();await expect(p.locator('.chapter-map.national-book-map')).toBeVisible();await expect(p.locator('#collection-search')).toHaveValue('chua');
 for(const tab of ['food','collection','landmark']){await p.locator(`[data-tab="${tab}"]`).click();await expect(p.locator(`[data-tab="${tab}"]`)).toHaveAttribute('aria-pressed','true');}
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.screenshot({path:`artifacts/book-layout-${width}.png`,fullPage:true});await p.close();
}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS book layout: map tab left, four tabs right, shared fold desktop, mobile, navigation and retained search');
