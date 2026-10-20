"""Resolve new place references and optional coordinates; validate points against historical regions."""
import json,urllib.request,urllib.parse
from pathlib import Path
from shapely.geometry import shape,Point
ROOT=Path(__file__).resolve().parents[1];d=json.loads((ROOT/'dist/data.json').read_text());rs={r['id']:shape(r['geometry']) for r in d['regions']};places=json.loads((ROOT/'scripts/new-places.json').read_text());titles={line.split('|')[1]:line.split('|')[2] for line in (ROOT/'scripts/new-places.tsv').read_text().splitlines()}
for offset in range(0,len(places),20):
 batch=places[offset:offset+20];u='https://vi.wikipedia.org/w/api.php?'+urllib.parse.urlencode(dict(action='query',prop='coordinates|info|pageprops',inprop='url',titles='|'.join(titles[c['name']] for c in batch),redirects=1,format='json'))
 try:
  q=json.load(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'MatMaVietNam/0.1 (educational prototype)'}),timeout=30))['query'];pages={p['title']:p for p in q['pages'].values()};redirects={r['from']:r['to'] for r in q.get('normalized',[])+q.get('redirects',[])}
  for c in batch:
   title=titles[c['name']];seen=set()
   while title in redirects and title not in seen:seen.add(title);title=redirects[title]
   p=pages.get(title,{})
   if 'missing' in p or 'disambiguation' in p.get('pageprops',{}):continue
   if c['sourceLabel']=='Wikipedia' and p.get('fullurl'):c['source']=p['fullurl']
   xy=p.get('coordinates',[])
   if xy:
    point=[xy[0]['lon'],xy[0]['lat']]
    if rs[c['region']].distance(Point(point))<.04:c['coordinates']=point;c['coordinatesSource']=p['fullurl']
 except Exception as e:print('Reference batch unavailable:',offset,type(e).__name__)
(ROOT/'scripts/new-places.json').write_text(json.dumps(places,ensure_ascii=False,indent=2));print('New places with validated coordinates:',sum(bool(c.get('coordinates')) for c in places))
