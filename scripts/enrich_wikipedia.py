"""Resolve proposed references and coordinates; never invent a coordinate for an unresolved title."""
import json,urllib.request,urllib.parse,time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];d=json.loads((ROOT/'dist/data.json').read_text())
aliases={'Chùa Keo':'Chùa Keo Thái Bình','Đền Trần Thái Bình':'Đền Trần (Thái Bình)','Văn Miếu':'Văn Miếu – Quốc Tử Giám','Dinh Độc Lập':'Dinh Độc Lập','Bưu điện Trung tâm':'Bưu điện trung tâm Sài Gòn','Đồi chè Mộc Châu':'Mộc Châu','Động Pu Sam Cáp':'Pu Sam Cáp','Thành nhà Hồ':'Thành nhà Hồ','Ngọ Môn':'Ngọ Môn','Chùa Đồng Yên Tử':'Chùa Đồng','Thánh địa Mỹ Sơn':'Thánh địa Mỹ Sơn','Tràng An':'Quần thể danh thắng Tràng An','Nhà thờ Núi Nha Trang':'Nhà thờ chính tòa Kitô Vua (Nha Trang)','Hồ Hoàn Kiếm':'Hồ Hoàn Kiếm','Hòn Trống Mái':'Hòn Trống Mái (Hạ Long)','Bù Gia Mập':'Vườn quốc gia Bù Gia Mập','Tràm Chim':'Vườn quốc gia Tràm Chim','Rừng U Minh Hạ':'Vườn quốc gia U Minh Hạ','Tòa thánh Tây Ninh':'Tòa Thánh Tây Ninh','Tượng Chúa Kitô':'Tượng Chúa Kitô Vua (Vũng Tàu)','Nhà Công tử Bạc Liêu':'Nhà công tử Bạc Liêu','Ga Đà Lạt':'Ga Đà Lạt','Đồi chè Tân Cương':'Tân Cương (xã)','Hải đăng Đại Lãnh':'Hải đăng Đại Lãnh','Thủy điện Hòa Bình':'Nhà máy thủy điện Hòa Bình','Mũi Cà Mau':'Mũi Cà Mau'}
# Ambiguous landscape region pages must not become site coordinates.
no_coord={'Đồi chè Mộc Châu','Đồi chè Tân Cương'}
resolved={};cards=d['cards'];request_count=0
for offset in range(0,len(cards),30):
 batch=cards[offset:offset+30];titles=[aliases.get(c['name'],c['name']) for c in batch]
 query=urllib.parse.urlencode({'action':'query','prop':'coordinates|info|pageprops','inprop':'url','titles':'|'.join(titles),'redirects':1,'format':'json'})
 try:
  req=urllib.request.Request('https://vi.wikipedia.org/w/api.php?'+query,headers={'User-Agent':'mat-ma-viet-nam/0.1 (educational local prototype)'})
  result=json.load(urllib.request.urlopen(req,timeout=25))['query'];pages={p['title']:p for p in result['pages'].values()};redirect={x['from']:x['to'] for x in result.get('normalized',[])+result.get('redirects',[])}
  for c,title in zip(batch,titles):
   seen=set()
   while title in redirect and title not in seen:seen.add(title);title=redirect[title]
   page=pages.get(title)
   if not page or 'missing' in page or 'disambiguation' in page.get('pageprops',{}):continue
   entry={'source':page['fullurl'],'sourceLabel':'Wikipedia','referenceStatus':'article-found'}
   xy=page.get('coordinates',[])
   if xy and c['type']=='landmark' and c['name'] not in no_coord:entry['coordinates']=[xy[0]['lon'],xy[0]['lat']];entry['coordinatesSource']=page['fullurl']
   resolved[c['id']]=entry
  request_count+=1
 except Exception as e:print('Batch failed',offset,type(e).__name__)
 time.sleep(.15)
(ROOT/'scripts/wiki-references.json').write_text(json.dumps(resolved,ensure_ascii=False,indent=2))
print('Resolved references',len(resolved),'coordinate references',sum('coordinates' in x for x in resolved.values()),'requests',request_count)
