import {test} from 'node:test';import assert from 'node:assert/strict';
import {setSoundEnabled,playSuccessSound} from '../dist/sound.mjs';
test('Success sound uses three quiet notes, honors mute, and survives unavailable audio',async()=>{
 const events=[];
 globalThis.AudioContext=class {state='running';currentTime=0;destination={};createOscillator(){return {frequency:{value:0},connect(){},start(){events.push('start');},stop(){},disconnect(){}};}createGain(){return {gain:{setValueAtTime(){},linearRampToValueAtTime(v){assert(v<=.06);},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};}async suspend(){this.state='suspended';}async resume(){this.state='running';}};
 setSoundEnabled(true);assert.equal(await playSuccessSound(),true);assert.equal(events.length,3);
 setSoundEnabled(false);assert.equal(await playSuccessSound(),false);assert.equal(events.length,3);
 setSoundEnabled(true);assert.equal(await playSuccessSound(),true);assert.equal(events.length,6);delete globalThis.AudioContext;assert.equal(await playSuccessSound(),false);
});
