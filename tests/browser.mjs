import {chromium} from '@playwright/test';
import {mkdirSync,readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const d=JSON.parse(readFileSync('dist/data.json'));
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1050}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:4173',{waitUntil:'domcontentloaded'});await page.getByRole('heading',{name:'Chọn nơi bạn khởi hành'}).waitFor();
await page.locator('#player-name').fill('Nhà thám hiểm');await page.locator('#start-search').fill('Thái Bình');await page.locator('[data-start="thai-binh"]').click();await page.getByRole('button',{name:/Mở sổ hành trình/}).click();
await page.getByRole('heading',{name:'Hưng Yên',exact:true}).waitFor();assert.equal(await page.locator('.collection-page .bookmark-tabs button').count(),4);assert.equal(await page.locator('[data-switch],.map-key').count(),0);
await page.screenshot({path:'artifacts/book-desktop.png',fullPage:true});
for(const c of d.cards.filter(c=>c.region==='thai-binh'&&c.type==='landmark').slice(0,3)){
 await page.locator(`.card-row[data-card="${c.id}"]`).click();await page.locator('.question-blank').waitFor();if(c.id==='thai-binh-0'){await page.locator(`button[data-answer]:not([data-answer="${c.id}"])`).first().click();assert.equal(JSON.parse(await page.evaluate(()=>localStorage.getItem('so-viet-player-v1'))).earned.length,0);await page.screenshot({path:'artifacts/question-desktop.png',fullPage:true});}await page.locator(`[data-answer="${c.id}"]`).click();await page.locator('dialog[data-view="reward"] .reward-art .art').waitFor();await page.locator('#claim').click();
}
assert((await page.locator('.chapter-map [data-region="hung-yen"]').getAttribute('class')).includes('available'));assert.equal(await page.locator('.map-pin').count(),2);
await page.reload();await page.getByRole('heading',{name:'Hưng Yên',exact:true}).waitFor();assert.equal(await page.locator('.map-pin').count(),2);
await page.getByRole('button',{name:'Món ăn',exact:true}).click();assert.equal(await page.locator('.card-row').count(),2);await page.getByRole('button',{name:'Bộ Sưu Tập',exact:true}).click();await page.getByRole('button',{name:'Thành Tựu',exact:true}).click();assert(await page.locator('.achievement-card[data-achievement="banh-mi"]').isVisible());
await page.getByRole('button',{name:'Tìm kiếm',exact:true}).click();await page.locator('#collection-search').fill('banh mi');assert(await page.locator('.search-result').count()>=2);await page.locator('#collection-search').fill('<img onerror=alert(1)>');assert.equal(await page.locator('#search-results img').count(),0);
await page.getByRole('button',{name:'Địa danh',exact:true}).click();await page.locator('.all-button').click();await page.getByRole('heading',{name:'Bản đồ Việt Nam'}).waitFor();assert.equal(await page.locator('.national [data-chapter]').count(),34);const initial=await page.locator('.national').getAttribute('viewBox');await page.locator('.national').hover();await page.mouse.wheel(0,150);assert.notEqual(await page.locator('.national').getAttribute('viewBox'),initial);await page.locator('.national [data-chapter="hung-yen"]').click();await page.locator('.chapter-select-map [data-region="thai-binh"]').click();
await page.setViewportSize({width:375,height:812});await page.screenshot({path:'artifacts/book-mobile.png',fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
for(const width of [768,1024]){await page.setViewportSize({width,height:1050});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Overflow at ${width}`);assert(await page.evaluate(()=>[...document.querySelectorAll('.book>.page')].every(el=>el.getBoundingClientRect().bottom<=document.querySelector('.book').getBoundingClientRect().bottom+2)),`Book overflow at ${width}`);}
// Image practice cannot duplicate a card.
await page.setViewportSize({width:1440,height:1050});await page.locator('.card-row[data-card="thai-binh-0"]').click();await page.locator('#practice').click();await page.locator('[data-answer="thai-binh-0"]').click();await page.locator('#claim').click();
assert.equal(JSON.parse(await page.evaluate(()=>localStorage.getItem('so-viet-player-v1'))).earned.length,3);

await page.locator('.profile').click();const download=page.waitForEvent('download');await page.locator('#export').click();assert.equal((await download).suggestedFilename(),'mat-ma-viet-nam-tien-do.json');await page.locator('.dialog-close').click();
assert.deepEqual(errors,[]);console.log('Browser PASS: onboarding, quiz x3, unlock, persistence, all four tabs, accent-insensitive search, map zoom, 375/768/1024/1440 layouts, image practice, export, no runtime errors.');
await browser.close();
