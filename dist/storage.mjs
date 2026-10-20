export const PLAYER_KEY='mat-ma-viet-nam-player-v1';
export const SOUND_KEY='mat-ma-viet-nam-sound-v1';
// Legacy keys are read only to preserve existing players during the rename.
const LEGACY_PLAYER_KEY='so-viet-player-v1',LEGACY_SOUND_KEY='so-viet-sound-v1';
export function readPlayerSave(storage,validate){
 const current=storage.getItem(PLAYER_KEY);if(current!==null)return current;
 const old=storage.getItem(LEGACY_PLAYER_KEY);if(!old||!validate(old))return null;
 try{const owner=storage.getItem(LEGACY_PLAYER_KEY+'-owner');if(owner)storage.setItem(PLAYER_KEY+'-owner',owner);else storage.removeItem(PLAYER_KEY+'-owner');storage.setItem(PLAYER_KEY,old);storage.removeItem(LEGACY_PLAYER_KEY);storage.removeItem(LEGACY_PLAYER_KEY+'-owner');}catch{/* Keep the readable original if storage is full or unavailable for writes. */}
 return old;
}
export function readSoundPreference(storage){const current=storage.getItem(SOUND_KEY);if(current!==null)return current;const old=storage.getItem(LEGACY_SOUND_KEY);if(old!==null){try{storage.setItem(SOUND_KEY,old);storage.removeItem(LEGACY_SOUND_KEY);}catch{}}return old;}

export function readPlayerOwner(storage){return storage.getItem(PLAYER_KEY)!==null?storage.getItem(PLAYER_KEY+'-owner'):storage.getItem(LEGACY_PLAYER_KEY+'-owner');}
