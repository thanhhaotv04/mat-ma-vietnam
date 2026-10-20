import {mergeProgress} from '../dist/sync-state.mjs';
import {initializeApp} from 'firebase/app';
import {getAuth,signInAnonymously,signInWithEmailAndPassword,EmailAuthProvider,linkWithCredential,signOut,sendPasswordResetEmail} from 'firebase/auth';
import {getFirestore,doc,getDoc,runTransaction,deleteDoc,serverTimestamp} from 'firebase/firestore';
// One private progress document per Firebase UID. No public player directory.
export async function connectCloud({local,owner,validate,onError}) {
 const response=await fetch('./firebase-config.json');
 if(!response.ok)return null;
 const config=await response.json();
 if(!config.projectId||!config.apiKey)throw Error('config');
 const app=initializeApp(config),auth=getAuth(app),db=getFirestore(app);
 await auth.authStateReady();
 if(!auth.currentUser)await signInAnonymously(auth);
 let queue=Promise.resolve(),loadedUid='';
 const ref=uid=>doc(db,'players',uid);
 async function load(fallback=null){const user=auth.currentUser,snapshot=await getDoc(ref(user.uid));return mergeProgress(fallback,snapshot.exists()?validate(snapshot.data().progress):null);}
 const initial=await load(!owner||owner===auth.currentUser.uid?local:null);loadedUid=auth.currentUser.uid;
 function save(progress){if(auth.currentUser?.uid!==loadedUid){onError();return Promise.resolve();}const uid=loadedUid,payload=structuredClone(progress);queue=queue.catch(()=>{}).then(()=>runTransaction(db,async tx=>{const snapshot=await tx.get(ref(uid)),remote=snapshot.exists()?validate(snapshot.data().progress):null;tx.set(ref(uid),{progress:mergeProgress(payload,remote),updatedAt:serverTimestamp()});})).catch(onError);return queue;}
 return {
  initial,
  get uid(){return loadedUid;},
  get ready(){return auth.currentUser?.uid===loadedUid;},
  get email(){return auth.currentUser.isAnonymous?'':auth.currentUser.email;},
  save,
  async resetPassword(email){await sendPasswordResetEmail(auth,email);},
  async register(email,password){if(!this.ready)throw Error('session');await linkWithCredential(auth.currentUser,EmailAuthProvider.credential(email,password));},
  async login(email,password){await queue;await signInWithEmailAndPassword(auth,email,password);const result=await load();loadedUid=auth.currentUser.uid;return result;},
  async logout(){await queue;await signOut(auth);await signInAnonymously(auth);const result=await load();loadedUid=auth.currentUser.uid;return result;},
  async reset(){if(!this.ready)throw Error('session');await queue;await deleteDoc(ref(auth.currentUser.uid));}
 };
}
