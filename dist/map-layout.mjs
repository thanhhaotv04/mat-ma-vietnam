// Display-only island insets. Canonical geometry and GPS coordinates remain unchanged.
const polygons=g=>g.type==='Polygon'?[g.coordinates]:g.coordinates;
const area=p=>Math.abs(p[0].reduce((s,v,i,r)=>{const n=r[(i+1)%r.length];return s+v[0]*n[1]-n[0]*v[1];},0));
export function geometryBounds(features){const points=features.flatMap(f=>polygons(f.geometry).flat(2));const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);return [Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)];}
const gap=(a,b)=>Math.hypot(Math.max(0,a[0]-b[2],b[0]-a[2]),Math.max(0,a[1]-b[3],b[1]-a[3]));
export function compactIslands(features,ids,sharedMainland=true){
 const groups=new Map(features.filter(f=>ids.includes(f.id)).map(f=>{const ps=polygons(f.geometry),main=ps.reduce((a,b)=>area(a)>area(b)?a:b),bb=geometryBounds([{geometry:{type:'Polygon',coordinates:main}}]),span=Math.max(bb[2]-bb[0],bb[3]-bb[1]);return [f.id,ps.filter(p=>gap(bb,geometryBounds([{geometry:{type:'Polygon',coordinates:p}}]))>span*.75)];}));
 const mainland=features.map(f=>({geometry:{type:'MultiPolygon',coordinates:polygons(f.geometry).filter(p=>!groups.get(f.id)?.includes(p))}}));
 const allBounds=geometryBounds(mainland),insets=[];
 const laidOut=features.map((f,i)=>{const offshore=groups.get(f.id);if(!offshore?.length)return f;
  const src=geometryBounds([{geometry:{type:'MultiPolygon',coordinates:offshore}}]),bb=sharedMainland?allBounds:geometryBounds([mainland[i]]),w=bb[2]-bb[0],h=bb[3]-bb[1],span=Math.max(w,h),scale=Math.min(span*.28/(src[2]-src[0]),span*.35/(src[3]-src[1])),x=bb[2]+span*.09,y=(bb[1]+bb[3])/2-(src[3]-src[1])*scale/2;
  const transform=p=>[x+(p[0]-src[0])*scale,y+(p[1]-src[1])*scale];
  const box=[x,y,x+(src[2]-src[0])*scale,y+(src[3]-src[1])*scale];
  insets.push({id:f.id,name:({'da-nang':'QĐ. Hoàng Sa','khanh-hoa':'QĐ. Trường Sa','tp-ho-chi-minh':'Côn Đảo','ba-ria---vung-tau':'Côn Đảo'})[f.id],box,sourceBounds:src,transform});
  return {...f,geometry:{type:'MultiPolygon',coordinates:polygons(f.geometry).map(p=>offshore.includes(p)?p.map(r=>r.map(transform)):p)}};
 });
 return {features:laidOut,insets,point:(id,p)=>{const inset=insets.find(t=>t.id===id&&p[0]>=t.sourceBounds[0]&&p[0]<=t.sourceBounds[2]&&p[1]>=t.sourceBounds[1]&&p[1]<=t.sourceBounds[3]);return inset?inset.transform(p):p;}};
}
export function lockMarker(x,y,size){return `<svg class="map-lock" x="${x-size/2}" y="${y-size/2}" width="${size}" height="${size}" style="width:${size}px;height:${size}px" viewBox="0 0 24 24" fill="none" stroke="#536b66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pointer-events="none" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="3" fill="#fffaf0"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>`;}

export function compactWorld(world){const layout=compactIslands(world.features,['da-nang','khanh-hoa','tp-ho-chi-minh'],false),bb=geometryBounds(layout.features);return {...world,features:layout.features.map(f=>({...f,displayBounds:geometryBounds([f])})),bounds:[bb[0],bb[1],bb[2]-bb[0],bb[3]-bb[1]],labels:world.labels.map(l=>{const inset=layout.insets.find(t=>t.name===l.name);return inset?{...l,point:[(inset.box[0]+inset.box[2])/2,inset.box[3]]}:l;})};}
