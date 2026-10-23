"""Use current province names; add communes only from verified pins inside local ward polygons."""
import json,unicodedata,argparse
from pathlib import Path
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--database',type=Path,required=True);args=parser.parse_args()
d=json.loads((root/'dist/data.json').read_text());db=args.database
units=json.loads((db/'json/simplified_json_generated_data_vn_units.json').read_text())
def key(s):return ''.join(c for c in unicodedata.normalize('NFD',s.lower().replace('đ','d')) if not unicodedata.combining(c)).replace('thanh pho ','').replace('tp. ','').replace(' ','').replace('-','')
provinces={key(p['Name']):p for p in units};regions={r['id']:r for r in d['regions']};chapters={c['id']:c for c in d['chapters']}
def ring_contains(ring,x,y):
 inside=False
 for a,b in zip(ring,ring[1:]+ring[:1]):
  if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:inside=not inside
 return inside
def contains(geometry,x,y):
 polygons=geometry['coordinates'] if geometry['type']=='MultiPolygon' else [geometry['coordinates']]
 return any(ring_contains(p[0],x,y) and not any(ring_contains(h,x,y) for h in p[1:]) for p in polygons)
cache={}
def wards(province):
 code=province['Code']
 if code not in cache:
  folder=next((db/'json/geojson').glob(code+'_*'))/'wards';cache[code]=[]
  names={w['Code']:w['FullName'] for w in province['Wards']}
  for p in folder.glob('*.geojson'):
   x=json.loads(p.read_text())
   for f in x['features']:
    if str(f.get('id')) in names:cache[code].append((names[str(f['id'])],f.get('bbox',x.get('bbox')),f['geometry']))
 return cache[code]
locations={}
review=json.loads((root/'scripts/landmark-address-review.json').read_text())
for c in d['cards']:
 if c['type']!='landmark' or 'phi vật thể' in (c.get('heritage') or {}).get('kind',''):continue
 related=c.get('easterEgg',{}).get('requiredRegions') or [c['region']]
 ps=[]
 for rid in related:
  p=provinces[key(chapters[regions[rid]['chapter']]['name'])]
  if p not in ps:ps.append(p)
 row={'province': ' / '.join(p['FullName'] for p in ps), 'source':'Vietnamese Provinces Database (34 provinces)'}
 # Extended landscapes and shared sites can span multiple communes: don't narrow them to one pin.
 broad=c['name'].lower().startswith(('vườn quốc gia','vịnh ','quần đảo','đèo ','rừng ','biển ','bán đảo','ruộng bậc thang','khu bảo tồn'))
 if len(ps)==1 and c.get('coordinateVerified') and c.get('coordinates') and not broad:
  x,y=c['coordinates'];matches=[name for name,bbox,g in wards(ps[0]) if (not bbox or bbox[0]<=x<=bbox[2] and bbox[1]<=y<=bbox[3]) and contains(g,x,y)]
  if len(matches)==1:row.update(commune=matches[0],source='Verified landmark pin + current ward polygon',coordinateSource=c.get('coordinateSource',c['source']))
 if c['id']=='ha-noi-visit-nha-tu-hoa-lo':row.update(commune='Phường Cửa Nam',source='https://hoalo.vn/Articles/4/gioi-thieu')
 if c['id']=='lai-chau-1':row.update(commune='Xã Tân Uyên',source='https://baolaichau.vn/du-lich/khoi-sac-du-lich-tan-uyen-775547')
 if c['id'] in review:row.update(review[c['id']])
 locations[c['id']]=row
(root/'dist/landmark-locations.json').write_text(json.dumps(locations,ensure_ascii=False,indent=2)+'\n')
print(f'{len(locations)} physical places; {sum("commune" in v for v in locations.values())} with verified commune; intangible heritage excluded')
