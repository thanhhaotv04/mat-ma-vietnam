// Short feedback only, initiated by a correct-answer click. No background audio or network request.
import {SOUND_KEY,readSoundPreference} from './storage.mjs';
const KEY=SOUND_KEY;
let enabled=true,context;
try{enabled=readSoundPreference(localStorage)!=='off';}catch{}
export function soundEnabled(){return enabled;}
export function setSoundEnabled(value){enabled=Boolean(value);try{localStorage.setItem(KEY,enabled?'on':'off');}catch{}if(!enabled&&context?.state==='running')void context.suspend().catch(()=>{});}
export async function playSuccessSound(){
 if(!enabled)return false;
 try{
  const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;
  if(!Audio)return false;
  context??=new Audio();
  if(context.state==='suspended')await context.resume();
  if(!enabled||context.state!=='running')return false;
  const start=context.currentTime;
  [523.25,659.25,783.99].forEach((frequency,i)=>{
   const oscillator=context.createOscillator(),gain=context.createGain(),at=start+i*.075;
   oscillator.type='sine';oscillator.frequency.value=frequency;
   gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(.055,at+.012);gain.gain.exponentialRampToValueAtTime(.001,at+.19);
   oscillator.connect(gain);gain.connect(context.destination);oscillator.start(at);oscillator.stop(at+.2);
   oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
  });
  return true;
 }catch{return false;}
}
