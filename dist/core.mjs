export const normalize = s => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
export function fresh(name, region) { return {version:1,name:name.trim().slice(0,40),starts:[region],earned:[],shiny:[],lastRegion:region}; }
export function completed(data,state,id){return data.regions.find(r=>r.id===id)?.cards.filter(c=>state.earned.includes(c)).length>=3;}
export function access(data,state){
 const regions=new Set([...state.starts,...data.cards.filter(c=>state.earned.includes(c.id)).map(c=>c.region)]),chapters=new Set();
 for(const id of regions){const r=data.regions.find(r=>r.id===id);if(r)chapters.add(r.chapter);}
 for(const r of data.regions)if(completed(data,state,r.id)){for(const id of data.chapters.find(c=>c.id===r.chapter).regions)regions.add(id);}
 for(const c of data.chapters)if(c.regions.every(id=>completed(data,state,id))){chapters.add(c.id);for(const n of c.neighbors)chapters.add(n);}
 return {regions,chapters};
}
export function canEnter(data,state,id){const r=data.regions.find(r=>r.id===id);if(!r)return false;const a=access(data,state);return a.regions.has(id)||(a.chapters.has(r.chapter)&&!data.chapters.find(c=>c.id===r.chapter).regions.some(x=>a.regions.has(x)));}
export function enter(data,state,id){if(!canEnter(data,state,id))return false;if(!access(data,state).regions.has(id))state.starts.push(id);state.lastRegion=id;return true;}
export function award(data,state,id){const card=data.cards.find(c=>c.id===id);if(!card||!access(data,state).regions.has(card.region)||state.earned.includes(id))return false;state.earned.push(id);return true;}
export function restore(data,raw){
 try{const s=JSON.parse(raw);if(s.version!==1||typeof s.name!=='string'||!s.name.trim()||!Array.isArray(s.starts)||!s.starts.length||!Array.isArray(s.earned))return null;
 const rids=new Set(data.regions.map(r=>r.id)),cids=new Set(data.cards.map(c=>c.id));
 const retired=new Set(data.retiredCardIds||[]);
 if(!s.starts.every(x=>rids.has(x))||!s.earned.every(x=>cids.has(x)||retired.has(x)))return null;
 return {version:1,name:s.name.slice(0,40),starts:[...new Set(s.starts)],earned:[...new Set(s.earned.filter(id=>cids.has(id)))],shiny:[...new Set((Array.isArray(s.shiny)?s.shiny:[]).filter(id=>s.earned.includes(id)&&cids.has(id)))],lastRegion:rids.has(s.lastRegion)?s.lastRegion:s.starts[0]};
 }catch{return null;}
}
export function achievements(data,state){
 const out=[{id:'first',name:'Bước chân đầu tiên',intro:'Nhận thẻ khám phá đầu tiên.',current:Math.min(1,state.earned.length),total:1,icon:'spark'}];
 for(const macro of ['Bắc','Trung','Tây Nguyên','Nam']){const rs=data.regions.filter(r=>r.macro===macro);out.push({id:macro,name:macro==='Tây Nguyên'?macro:'Miền '+macro,intro:'Hoàn thành tất cả vùng khám phá trong khu vực.',current:rs.filter(r=>completed(data,state,r.id)).length,total:rs.length,icon:'map'});}
 for(const [tag,name] of [['banh-mi','Vua Bánh Mì'],['bun','Vua Bún'],['hu-tieu','Vua Hủ Tiếu'],['cau','Vua Cầu']]){const cs=data.cards.filter(c=>c.tags.includes(tag));out.push({id:tag,name,intro:'Thu thập đủ các thẻ thuộc bộ sưu tập này.',current:cs.filter(c=>state.earned.includes(c.id)).length,total:cs.length,icon:tag==='cau'?'map':'food'});}
 const hs=data.cards.filter(c=>c.heritage);out.push({id:'unesco',name:'Dấu chân di sản',intro:'Thu thập các thẻ địa danh thuộc Di sản thế giới UNESCO.',current:hs.filter(c=>state.earned.includes(c.id)).length,total:hs.length,icon:'trophy'});return out;
}
