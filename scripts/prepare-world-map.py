"""Reuse the reference app's planar silhouettes; never treat these as GPS coordinates."""
import json,unicodedata
from pathlib import Path
from shapely.geometry import shape,mapping
from shapely.ops import unary_union
ROOT=Path(__file__).resolve().parents[1]
source=Path('/home/thanhhao/thanhhao/Github/App/VietNam-map-checkin/assets/vietnam-provinces.geojson')
d=json.loads((ROOT/'dist/data.json').read_text());raw=json.loads(source.read_text())
def n(s):return unicodedata.normalize('NFD',s.replace('đ','d').replace('Đ','D')).encode('ascii','ignore').decode().lower().replace(' ','').replace('-','').replace('.','')
aliases={'t phochiminh':'tphcm','tphochiminh':'tphcm','hochiminh':'tphcm','thanhphohochiminh':'tphcm','thuathienhue':'hue'}
regions={n(r['name']):r for r in d['regions']};groups={};labels={}
for f in raw['features']:
 key=n(f['properties']['ten_tinh']);key=aliases.get(key,key);r=regions.get(key)
 if not r:raise ValueError('Unmatched region '+f['properties']['ten_tinh'])
 g=shape(f['geometry']).buffer(0);groups.setdefault(r['chapter'],[]).append(g)
 if r['id'] in ['da-nang','khanh-hoa','kien-giang','ba-ria---vung-tau']:
  polys=list(g.geoms) if g.geom_type=='MultiPolygon' else [g];polys.sort(key=lambda p:p.area,reverse=True)
  if r['id'] in ['da-nang','khanh-hoa']:
   sea=unary_union(polys[1:]);p=sea.centroid;labels[r['id']]={'name':'QĐ. Hoàng Sa' if r['id']=='da-nang' else 'QĐ. Trường Sa','point':[p.x,p.y]}
  elif r['id']=='kien-giang':
   p=polys[1].centroid;labels[r['id']]={'name':'Phú Quốc','point':[p.x,p.y]}
  else:
   p=min(polys,key=lambda p:p.centroid.x).centroid;labels[r['id']]={'name':'Côn Đảo','point':[p.x,p.y]}
features=[]
for ch in d['chapters']:
 g=unary_union(groups[ch['id']]);polys=list(g.geoms) if g.geom_type=='MultiPolygon' else [g];main=max(polys,key=lambda p:p.area);p=main.representative_point()
 features.append({'id':ch['id'],'name':ch['name'],'geometry':mapping(g),'mainlandBounds':list(main.bounds),'center':[p.x,p.y]})
allg=unary_union([shape(f['geometry']) for f in features]);a,b,c,e=allg.bounds
out={'coordinateSpace':'reference-svg-plane','source':'VietNam-map-checkin/assets/vietnam-provinces.geojson','bounds':[a,b,c-a,e-b],'features':features,'labels':list(labels.values())}
(ROOT/'dist/world-map.json').write_text(json.dumps(out,ensure_ascii=False,separators=(',',':')))
print(len(features),'chapters; bounds',out['bounds'],'labels',out['labels'])
