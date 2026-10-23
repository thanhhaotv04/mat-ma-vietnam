import {chromium,expect} from '@playwright/test';
import {fresh} from '../dist/core.mjs';
const browser=await chromium.launch();
try{
 for(const width of [375,1440]){
  const p=await browser.newPage({viewport:{width,height:1000}});
  const s=fresh('Địa chỉ','hung-yen');s.earned=['hung-yen-0','hung-yen-2'];
  await p.addInitScript(s=>localStorage.setItem('mat-ma-viet-nam-player-v1',JSON.stringify(s)),s);
  await p.route('**/firebase-config.json',r=>r.fulfill({status:404,body:'{}'}));
  await p.goto('http://localhost:4173');
  for(const [id,address] of [['hung-yen-0','Phường Phố Hiến, Hưng Yên'],['hung-yen-2','Xã Đại Đồng, Hưng Yên']]){
   await p.locator(`.card-row[data-card="${id}"]`).click();
   await expect(p.locator('.card-location')).toHaveText(address);
   await p.locator('#practice').click();
   await expect(p.locator('#quiz-hint')).toBeEnabled();
   for(let i=0;i<3;i++)await p.locator('#quiz-hint').click();
   await p.locator('#check-letters').click();
   await expect(p.locator('.card-location')).toHaveText(address);
   await p.locator('#claim').click();
  }
  await p.close();
 }
 console.log('PASS Chùa Chuông and Làng Nôm addresses in detail and reward, mobile/desktop');
}finally{await browser.close();}
