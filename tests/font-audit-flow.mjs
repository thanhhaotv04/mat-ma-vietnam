import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fresh} from '../dist/core.mjs';
const browser=await chromium.launch(),results=[],issues=[],errors=[];
mkdirSync('artifacts/font-audit',{recursive:true});
try{
for(const width of [375,768,1024,1440]){
 const p=await browser.newPage({viewport:{width,height:1000}});
 p.on('pageerror',e=>errors.push(e.message));
 await p.route('**/cloud.mjs*',r=>r.fulfill({contentType:'text/javascript',body:`export async function connectCloud({local}){return {initial:local,email:'',uid:'font-test',ready:true,save:async()=>{},reset:async()=>{},login:async()=>{throw Object.assign(Error(),{code:'auth/invalid-credential'})},register:async()=>{},resetPassword:async()=>{},logout:async()=>null}}`}));
 const cdp=await p.context().newCDPSession(p);await cdp.send('DOM.enable');await cdp.send('CSS.enable');
 async function audit(scene){
  await p.evaluate(async()=>{await document.fonts.ready;await Promise.all(document.getAnimations().filter(a=>a.effect?.getComputedTiming().iterations!==Infinity).map(a=>a.finished.catch(()=>{})));await Promise.all([...document.images].filter(i=>i.checkVisibility()).map(i=>i.decode().catch(()=>{})));});
  const samples=await p.evaluate(()=>{
   let n=0;return [...document.querySelectorAll('body *')].filter(e=>e.checkVisibility()&&e.getBoundingClientRect().width>0&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&!['SCRIPT','STYLE'].includes(e.tagName)).map(e=>{
    e.dataset.fontAudit=String(n++);const s=getComputedStyle(e);return {id:e.dataset.fontAudit,text:[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim().slice(0,100),family:s.fontFamily,size:s.fontSize,weight:s.fontWeight};
   });
  });
  const root=(await cdp.send('DOM.getDocument')).root.nodeId;
  for(const s of samples){
   const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:root,selector:`[data-font-audit="${s.id}"]`});
   const {fonts}=await cdp.send('CSS.getPlatformFontsForNode',{nodeId});
   s.rendered=fonts.filter(f=>f.glyphCount).map(f=>({family:f.familyName,custom:f.isCustomFont,glyphs:f.glyphCount}));
   if(!s.family.startsWith('Nunito')||s.rendered.some(f=>!f.family.startsWith('Nunito')))issues.push({width,scene,...s});
  }
  results.push({width,scene,samples});
  await p.screenshot({path:`artifacts/font-audit/${scene}-${width}.png`});
 }
 await p.goto('http://localhost:4173');await expect(p.locator('.start-panel')).toBeVisible();await audit('start');
 await p.locator('[data-action="account"]').click();await audit('login');await p.locator('#register-account').click();await audit('register');await p.locator('#trial-mode').click();await audit('trial');await p.locator('.dialog-close').click();
 const s=fresh('Nguyễn Ánh Hồng','ha-noi');s.earned=['ha-noi-0'];
 await p.evaluate(s=>localStorage.setItem('mat-ma-viet-nam-player-v1',JSON.stringify(s)),s);await p.reload();await audit('landmarks');
 await p.locator('.card-row[data-card="ha-noi-0"]').click();await audit('detail');await p.locator('.dialog-close').click();
 await p.locator('.card-row[data-card="ha-noi-1"]').click();await expect(p.locator('#quiz-hint')).toBeEnabled();await audit('letters');await p.locator('#quiz-hint').click();await audit('hint');await p.locator('.dialog-close').click();
 await p.locator('[data-tab="food"]').click();await audit('foods');await p.locator('.card-row[data-card="ha-noi-3"]').click();await expect(p.locator('[data-answer]').first()).toBeEnabled();await audit('food-question');
 await p.locator('[data-answer]').filter({hasText:/Phở$/}).click();await expect(p.locator('#claim')).toBeVisible();await audit('reward');await p.locator('#claim').click();
 await p.locator('[data-tab="collection"]').click();await audit('collection');await p.getByRole('button',{name:'Thành Tựu',exact:true}).click();await audit('achievements');await p.locator('[data-achievement="first"]').click();await audit('achievement-detail');await p.locator('.dialog-close').click();
 await p.locator('[data-tab="search"]').click();await audit('search');await p.locator('.all-button').click();await audit('map');
 await p.locator('[data-action="profile"]').click();await audit('profile');await p.locator('#new-game').click();await audit('reset');await p.locator('.dialog-close').click();
 await p.goto('http://localhost:4173/credits.html');await audit('credits');
 await p.close();
}
writeFileSync('artifacts/font-audit/results.json',JSON.stringify({results,issues,errors},null,2));
console.log(JSON.stringify({screens:results.length,textSamples:results.reduce((n,r)=>n+r.samples.length,0),issues:issues.length,errors}));
if(issues.length)console.log(JSON.stringify(issues.slice(0,15),null,2));
assert.deepEqual(errors,[]);assert.deepEqual(issues,[]);
}finally{await browser.close();}
