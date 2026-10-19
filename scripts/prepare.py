import sys,json,glob,unicodedata,shutil
from pathlib import Path
sys.path.insert(0,'/tmp/so-viet-geo')
from shapely.geometry import shape,mapping
from shapely.ops import unary_union
import subprocess,bisect
from content import ROWS
ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path('/home/thanhhao/thanhhao/Skills/vietnamese/vietnamese-provinces-database')
def slug(s):
 return '-'.join(''.join(c for c in unicodedata.normalize('NFD',s.lower().replace('đ','d')) if unicodedata.category(c)!='Mn').replace('.','').split())
def clean(s):
 return {'Hoà Bình':'Hòa Bình','Thanh Hoá':'Thanh Hóa','Khánh Hoà':'Khánh Hòa','Thừa Thiên Huế':'Huế','Hồ Chí Minh':'TP.HCM','TP.Hồ Chí Minh':'TP.HCM','Bà Rịa-Vũng Tàu':'Bà Rịa - Vũng Tàu'}.get(s,s)
# Recover the 63 historical province memberships from the dataset's pre-merger release.
legacy=json.loads(subprocess.check_output(['git','-C',str(SOURCE),'show','v2.4.0:json/simplified_json_generated_data_vn_units.json']))
code_owner={}; starts=[]
for province in legacy:
 name=clean(province['Name'])
 ws=[int(w['Code']) for d in province['District'] for w in (d['Ward'] or [])]
 if ws:starts.append((min(ws),name))
 for code in ws:code_owner[code]=name
starts.sort(); grouped={}; inferred=[]
for p in glob.glob(str(SOURCE/'json/geojson/*/wards/*.geojson')):
 f=json.load(open(p))['features'][0];code=int(f['properties']['code']);name=code_owner.get(code)
 if name is None:
  name=starts[bisect.bisect_right([x[0] for x in starts],code)-1][1];inferred.append((code,name))
 grouped.setdefault(name,[]).append(shape(f['geometry']).buffer(0))
old={name:unary_union(gs) for name,gs in grouped.items()}
print('Regions regrouped from current ward geometries. New codes inferred by code range:',len(inferred), inferred)
chapters={};regions=[];cards=[]
atlas={'Chợ Bến Thành':0,'Dinh Độc Lập':1,'Hồ Hoàn Kiếm':2,'Văn Miếu':3,'Chùa Keo':4,'Đền Trần Thái Bình':5,'Thành nhà Hồ':6,'Pù Luông':7,'Cơm tấm Sài Gòn':8,'Kẹo dừa Bến Tre':9,'Bánh cáy làng Nguyễn':10,'Phở Hà Nội':11}
coords={'Chợ Bến Thành':[106.698,10.772],'Dinh Độc Lập':[106.6953,10.777],'Bưu điện Trung tâm':[106.6999,10.7798],'Hồ Hoàn Kiếm':[105.852,21.0288],'Văn Miếu':[105.8355,21.0273],'Chùa Một Cột':[105.833,21.0358],'Chùa Keo':[106.303,20.36],'Đền Trần Thái Bình':[106.135,20.61],'Biển Đồng Châu':[106.613,20.258],'Thành nhà Hồ':[105.604,20.078],'Pù Luông':[105.184,20.45],'Lam Kinh':[105.397,19.943]}
for row in ROWS.strip().splitlines():
 ch,name,macro,*items=row.split(';');rid=slug(name);cid=slug(ch)
 if cid not in chapters:chapters[cid]={'id':cid,'name':ch,'regions':[]}
 chapters[cid]['regions'].append(rid)
 g=old[name]
 r={'id':rid,'name':name,'chapter':cid,'macro':macro,'geometry':mapping(g.simplify(.004,preserve_topology=True)),'center':list(g.representative_point().coords)[0],'cards':[]}
 for i,item in enumerate(items):
  title,desc=item.split('~');ident=f'{rid}-{i}';typ='landmark' if i<3 else 'food'
  c={'id':ident,'region':rid,'type':typ,'name':title,'intro':desc,'source':'https://vi.wikipedia.org/wiki/'+title.replace(' ','_'),'sourceLabel':'Wikipedia · tham khảo','reviewed':False,'art':atlas.get(title),'coordinates':coords.get(title),'tags':[]}
  if 'Bánh mì' in title:c['tags'].append('banh-mi')
  if 'Bún' in title:c['tags'].append('bun')
  if 'Hủ tiếu' in title:c['tags'].append('hu-tieu')
  if title.startswith('Cầu '):c['tags'].append('cau')
  cards.append(c);r['cards'].append(ident)
 regions.append(r)
# Extra attractions: regions are never capped at three cards.
extras=[('Hà Nội','Hoàng thành Thăng Long','Khu trung tâm hoàng thành lưu giữ dấu tích lịch sử kinh đô qua nhiều thời kỳ.',[105.8404,21.0353]),('Thanh Hóa','Hòn Trống Mái','Hai khối đá gắn với truyền thuyết dân gian trên núi Trường Lệ.',[105.887,19.73]),('Thanh Hóa','Suối cá Cẩm Lương','Dòng suối ở chân núi có đàn cá sinh sống, gắn với tín ngưỡng địa phương.',[105.404,20.24]),('Quảng Nam','Phố cổ Hội An','Đô thị thương cảng cổ lưu giữ những dãy nhà, hội quán và tuyến phố ven sông.',[108.328,15.877]),('Hải Phòng','Quần đảo Cát Bà','Quần đảo có núi đá vôi, rừng và các vùng vịnh ven biển.',[107.047,20.802]),('Lâm Đồng','Đồi chè Cầu Đất','Những luống chè phủ trên đồi cao ở vùng ngoại ô Đà Lạt.',[108.54,11.87]),('Kiên Giang','Bãi Sao Phú Quốc','Bãi biển có cát sáng và nước xanh ở phía nam đảo Phú Quốc.',[104.035,10.056]),('TP.HCM','Cầu Mống','Cây cầu đi bộ bằng thép có màu xanh đặc trưng bên rạch Bến Nghé.',[106.704,10.767]),('Đà Nẵng','Cầu Sông Hàn','Cây cầu quay bắc qua sông Hàn, gắn với hình ảnh đô thị Đà Nẵng.',[108.229,16.072])]
for name,title,intro,xy in extras:
 r=next(x for x in regions if x['name']==name);ident=r['id']+'-extra-'+str(len(r['cards']));r['cards'].append(ident);cards.append({'id':ident,'region':r['id'],'type':'landmark','name':title,'intro':intro,'coordinates':xy,'source':'https://vi.wikipedia.org/wiki/'+title.replace(' ','_'),'sourceLabel':'Wikipedia · tham khảo','reviewed':False,'art':None,'tags':['cau'] if title.startswith('Cầu ') else []})
# Use canonical article URLs and real coordinates when the proposed title resolves.
references=json.loads((ROOT/'scripts/wiki-references.json').read_text()) if (ROOT/'scripts/wiki-references.json').exists() else {}
for c in cards:
 ref=references.get(c['id'])
 if ref:
  if 'coordinates' in ref:
   point=__import__('shapely.geometry',fromlist=['Point']).Point(ref['coordinates'])
   owner=next(r['name'] for r in regions if r['id']==c['region'])
   if old[owner].distance(point)>.04:
    ref=dict(ref);ref.pop('coordinates');ref.pop('coordinatesSource',None)
  c.update(ref)
 elif not c.get('heritage'):
  c['source']='https://vi.wikipedia.org/w/index.php?search='+__import__('urllib.parse',fromlist=['quote']).quote(c['name'])
  c['sourceLabel']='Tra cứu tư liệu'

# All nine World Heritage properties have a corresponding visiting location.
heritage={
'Hoàng thành Thăng Long':('Hoàng thành Thăng Long',2010,'1328'),
'Thành nhà Hồ':('Thành nhà Hồ',2011,'1358'),
'Ngọ Môn':('Quần thể di tích Cố đô Huế',1993,'678'),
'Phố cổ Hội An':('Đô thị cổ Hội An',1999,'948'),
'Thánh địa Mỹ Sơn':('Thánh địa Mỹ Sơn',1999,'949'),
'Chùa Đồng Yên Tử':('Quần thể Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc',2025,None),
'Chùa Vĩnh Nghiêm':('Quần thể Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc',2025,None),
'Chùa Côn Sơn':('Quần thể Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc',2025,None),
'Hòn Trống Mái':('Vịnh Hạ Long – Quần đảo Cát Bà',1994,'672'),
'Quần đảo Cát Bà':('Vịnh Hạ Long – Quần đảo Cát Bà',1994,'672'),
'Động Phong Nha':('Vườn quốc gia Phong Nha – Kẻ Bàng và Hin Nam Nô',2003,'951'),
'Tràng An':('Quần thể danh thắng Tràng An',2014,'1438')}
for c in cards:
 if c['name'] in heritage:
  n,y,num=heritage[c['name']];c['heritage']={'name':n,'year':y,'kind':'Di sản thế giới','source':f'https://whc.unesco.org/en/list/{num}/' if num else 'https://whc.unesco.org/en/statesparties/vn/'}
  c['source']=c['heritage']['source'];c['sourceLabel']='UNESCO';c['reviewed']=True
# Shared intangible heritage profiles, separate from visitable landmark cards.
intangible=[
 ('Hội Gióng ở đền Phù Đổng và đền Sóc','Lễ hội tưởng nhớ Thánh Gióng được cộng đồng tổ chức tại các đền ở Hà Nội.',['Hà Nội'],'00443'),
 ('Nghi lễ và trò chơi kéo co','Thực hành cộng đồng gắn với lễ hội, cầu mùa và sự đoàn kết.',['Hà Nội','Bắc Ninh','Vĩnh Phúc','Lào Cai'],'01080'),
 ('Nhã nhạc cung đình Huế','Âm nhạc cung đình gắn với nghi lễ của triều đình Huế.',['Huế'],'00074'),
 ('Không gian văn hóa cồng chiêng Tây Nguyên','Di sản gắn với cồng chiêng, nghi lễ và đời sống cộng đồng Tây Nguyên.',['Kon Tum','Gia Lai','Đắk Lắk','Đắk Nông','Lâm Đồng'],'00120'),
 ('Dân ca Quan họ Bắc Ninh','Lối hát đối đáp gắn với sinh hoạt văn hóa của cộng đồng Quan họ.',['Bắc Ninh','Bắc Giang'],'00183'),
 ('Ca trù','Nghệ thuật kết hợp giọng hát, phách và đàn đáy trong nhiều không gian văn hóa.',['Hà Nội','Hà Tĩnh'],'00309'),
 ('Hát Xoan Phú Thọ','Nghệ thuật hát gắn với tín ngưỡng thờ Hùng Vương và cộng đồng Phú Thọ.',['Phú Thọ'],'01260'),
 ('Tín ngưỡng thờ cúng Hùng Vương','Thực hành tưởng nhớ tổ tiên và các Vua Hùng tại Phú Thọ.',['Phú Thọ'],'00735'),
 ('Đờn ca tài tử Nam Bộ','Nghệ thuật âm nhạc được thực hành trong đời sống cộng đồng Nam Bộ.',['Bạc Liêu','Bến Tre','Cần Thơ','TP.HCM'],'00733'),
 ('Dân ca Ví, Giặm Nghệ Tĩnh','Dân ca gắn với lao động và đời sống của cộng đồng Nghệ An, Hà Tĩnh.',['Nghệ An','Hà Tĩnh'],'01008'),
 ('Thực hành tín ngưỡng thờ Mẫu Tam phủ','Thực hành tín ngưỡng thể hiện qua nghi lễ, âm nhạc và trang phục.',['Nam Định'],'01064'),
 ('Nghệ thuật Bài chòi Trung Bộ','Thực hành văn hóa kết hợp âm nhạc, diễn xướng và trò chơi.',['Bình Định','Quảng Nam'],'01222'),
 ('Thực hành Then của người Tày, Nùng, Thái','Thực hành tín ngưỡng có hát và nhạc cụ gắn với cộng đồng miền núi phía Bắc.',['Tuyên Quang','Bắc Kạn','Cao Bằng','Lạng Sơn'],'01379'),
 ('Nghệ thuật Xòe Thái','Những điệu múa cộng đồng thể hiện sự gắn kết và văn hóa người Thái.',['Yên Bái','Sơn La','Điện Biên','Lai Châu'],'01575'),
 ('Nghệ thuật làm gốm của người Chăm','Tri thức và kỹ năng làm gốm được truyền qua nhiều thế hệ.',['Ninh Thuận','Bình Thuận'],'01574'),
 ('Lễ hội Vía Bà Chúa Xứ Núi Sam','Lễ hội gắn với tín ngưỡng thờ Bà Chúa Xứ và cộng đồng địa phương.',['An Giang'],'01987'),
]
heritages=[{'id':'heritage-'+str(i),'name':n,'intro':intro,'regions':[slug(x) for x in names],'source':'https://ich.unesco.org/en/RL/'+num,'kind':'Di sản phi vật thể UNESCO'} for i,(n,intro,names,num) in enumerate(intangible)]
heritages.append({'id':'heritage-dong-ho','name':'Nghề làm tranh dân gian Đông Hồ','intro':'Nghề in tranh từ ván khắc gỗ, sử dụng giấy điệp và màu truyền thống. Được ghi danh vào Danh sách cần bảo vệ khẩn cấp năm 2025.','regions':['bac-ninh'],'source':'https://bvhttdl.gov.vn/Pages/chi-tiet.aspx?url=%2F17-di-san-duoc-unesco-ghi-danh-nen-van-hoa-phong-phu-do-so-cua-dan-toc-20251212150617854.htm','kind':'Di sản phi vật thể UNESCO'})
# Current official chapter boundaries from the requested MIT dataset.
geoms={}
for p in glob.glob(str(SOURCE/'json/geojson/*/*.geojson')):
 f=json.load(open(p))['features'][0];name=f['properties']['name'];name='TP. Hồ Chí Minh' if name=='Hồ Chí Minh' else name
 cid=slug(name)
 if cid not in chapters:continue
 g=shape(f['geometry']).buffer(0);geoms[cid]=g
 chapters[cid]['geometry']=mapping(g.simplify(.006,preserve_topology=True));chapters[cid]['center']=list(g.representative_point().coords)[0]
for cid,ch in chapters.items():
 ch['neighbors']=[other for other,g in geoms.items() if other!=cid and geoms[cid].distance(g)<.001]
assert len(regions)==63 and len(chapters)==34 and len(geoms)==34
assert all(len(r['cards'])>=4 for r in regions)
(ROOT/'dist/data.json').write_text(json.dumps({'chapters':list(chapters.values()),'regions':regions,'cards':cards,'heritages':heritages},ensure_ascii=False,separators=(',',':')))
shutil.copyfile(SOURCE/'LICENSE',ROOT/'dist/assets/provinces-LICENSE.txt')
print(f'{len(chapters)} chapters, {len(regions)} regions, {len(cards)} cards, {len(heritages)} shared heritage profiles')
print('Isolated chapters:',[c['name'] for c in chapters.values() if not c['neighbors']])
