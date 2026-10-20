import {lockMarker} from './map-layout.mjs?v=20261020-clean-ui';
import {access,collectionComplete} from './core.mjs?v=20261020-clean-ui';
export const mapAreas=[
 {id:'north',name:'Miền Bắc',chapters:['tuyen-quang','cao-bang','lai-chau','dien-bien','lang-son','son-la','lao-cai','thai-nguyen','phu-tho','ha-noi','quang-ninh','hai-phong','bac-ninh','hung-yen','ninh-binh']},
 {id:'central',name:'Miền Trung',chapters:['hue','thanh-hoa','nghe-an','ha-tinh','da-nang','quang-tri','quang-ngai','khanh-hoa','gia-lai','dak-lak','lam-dong']},
 {id:'south',name:'Miền Nam',chapters:['tp-ho-chi-minh','dong-nai','tay-ninh','can-tho','dong-thap','an-giang','vinh-long','ca-mau']}
];
export function focusArea(world,id){const area=mapAreas.find(a=>a.id===id),fs=world.features.filter(f=>area.chapters.includes(f.id)),base=worldViewBox(world,1,[0,0]);if(id==='central'){const center=world.features.find(f=>f.id==='da-nang').center;return {zoom:3.2,pan:[center[0]-(base[0]+base[2]/2),center[1]-(base[1]+base[3]/2)]};}const x=Math.min(...fs.map(f=>(f.displayBounds||f.mainlandBounds)[0])),y=Math.min(...fs.map(f=>(f.displayBounds||f.mainlandBounds)[1])),right=Math.max(...fs.map(f=>(f.displayBounds||f.mainlandBounds)[2])),bottom=Math.max(...fs.map(f=>(f.displayBounds||f.mainlandBounds)[3]));return {zoom:Math.max(1,Math.min(8,Math.min(base[2]/((right-x)*1.08),base[3]/((bottom-y)*1.08)))),pan:[(x+right)/2-(base[0]+base[2]/2),(y+bottom)/2-(base[1]+base[3]/2)]};}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rings=g=>g.type==='Polygon'?g.coordinates:g.coordinates.flat();
const path=g=>rings(g).map(r=>'M'+r.map(p=>p.map(n=>n.toFixed(3)).join(',')).join('L')+'Z').join('');
export function worldViewBox(world,zoom,pan){const [x,y,w,h]=world.bounds,p=Math.max(w,h)*.05,aspect=world.aspect||w/h,fullH=Math.max(h+2*p,(w+2*p)/aspect),fullW=fullH*aspect;return [x+w/2-fullW/zoom/2+pan[0],y+h/2-fullH/zoom/2+pan[1],fullW/zoom,fullH/zoom];}
export function focusChapter(world,data,id){const ch=data.chapters.find(c=>c.id===id),ids=new Set([id,...ch.neighbors]),fs=world.features.filter(f=>ids.has(f.id));const x=Math.min(...fs.map(f=>f.mainlandBounds[0])),y=Math.min(...fs.map(f=>f.mainlandBounds[1])),right=Math.max(...fs.map(f=>f.mainlandBounds[2])),bottom=Math.max(...fs.map(f=>f.mainlandBounds[3]));const base=worldViewBox(world,1,[0,0]);return {zoom:Math.max(1,Math.min(8,Math.min(base[2]/((right-x)*1.25),base[3]/((bottom-y)*1.25)))),pan:[(x+right)/2-(base[0]+base[2]/2),(y+bottom)/2-(base[1]+base[3]/2)]};}
export function worldMarkup(world,data,state,currentId,zoom,pan,areaId=''){
 const a=access(data,state),vb=worldViewBox(world,zoom,pan),fs=world.pixelWidth?vb[2]*world.labelPixels/world.pixelWidth:Math.max(5,vb[2]*.022),visible=mapAreas.find(a=>a.id===areaId)?.chapters;
 const shapes=mapAreas.map(area=>`<g role="group" aria-label="${area.name}" data-map-area="${area.id}">${world.features.filter(f=>area.chapters.includes(f.id)).map(f=>{
  const done=collectionComplete(data,state,data.chapters.find(c=>c.id===f.id).regions),available=a.chapters.has(f.id),status=done?'Đã sưu tập đủ':available?'Còn thẻ chưa mở':'Chưa mở';
  return `<path class="province ${available?'available':'locked'} ${f.id===currentId?'active':''} ${done?'done':''}" d="${path(f.geometry)}" fill-rule="evenodd" style="stroke-width:${vb[2]*.0018}" data-chapter="${f.id}" role="button" tabindex="0" aria-label="${esc(f.name)} · ${status}"><title>${esc(f.name)} · ${status}</title></path>`;
 }).join('')}</g>`).join('');
 const names=world.features.filter(f=>visible?visible.includes(f.id):zoom>=2||f.id===currentId).map(f=>`<text class="region-label" x="${f.center[0]}" y="${f.center[1]}" font-size="${fs}" text-anchor="middle" pointer-events="none">${esc(f.name)}</text>`).join('');
 const locks=world.features.filter(f=>(visible?visible.includes(f.id):zoom>=2)&&!a.chapters.has(f.id)).map(f=>lockMarker(f.center[0],f.center[1]-fs*1.5,fs*1.8)).join('');
 const areas=!areaId&&zoom<2?mapAreas.map(area=>{const fs=world.features.filter(f=>area.chapters.includes(f.id));const x=Math.min(...fs.map(f=>f.mainlandBounds[0]))-12,y=(Math.min(...fs.map(f=>f.mainlandBounds[1]))+Math.max(...fs.map(f=>f.mainlandBounds[3])))/2;return `<text class="area-label" x="${x}" y="${y}" font-size="${vb[2]*.025}" text-anchor="end" pointer-events="none">${area.name}</text>`;}).join(''):'';
 const islands=world.labels.map(l=>`<text class="island-label" x="${l.point[0]}" y="${l.point[1]+12}" font-size="${fs}" text-anchor="${['QĐ. Hoàng Sa','QĐ. Trường Sa'].includes(l.name)?'end':'middle'}" pointer-events="none">${esc(l.name)}</text>`).join('');
 return `<svg class="geographic-map national" viewBox="${vb.join(' ')}" role="group" aria-label="Bản đồ Việt Nam và các quần đảo">${shapes}${names}${locks}${areas}${islands}</svg>`;
}

export function focusCurrentChapter(world,id){const f=world.features.find(f=>f.id===id),[x,y,right,bottom]=f.displayBounds||f.mainlandBounds,base=worldViewBox(world,1,[0,0]);return {zoom:Math.max(1,Math.min(12,base[2]/((right-x)*1.35),base[3]/((bottom-y)*1.35))),pan:[(x+right)/2-(base[0]+base[2]/2),(y+bottom)/2-(base[1]+base[3]/2)]};}
