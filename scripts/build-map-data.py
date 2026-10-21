from pathlib import Path
from bs4 import BeautifulSoup
import json,re,hashlib,datetime
from urllib.parse import urljoin
root=Path(__file__).resolve().parents[1];work=root/'.map-source';stamp=datetime.datetime.now(datetime.timezone.utc).isoformat();records={};sources=[]
for p in sorted(work.glob('mqa*.html')):
 url='https://www.mqa.gov.my/mqr/'+('akrbyipta.cfm' if p.name=='mqa-0.html' else 'akrbyipts.cfm')
 if 'private-' in p.name:url+='?StartRow='+p.stem.split('-')[-1]
 raw=p.read_bytes();sources.append({'url':url,'sha256':hashlib.sha256(raw).hexdigest()})
 s=BeautifulSoup(raw,'html.parser')
 for a in s.select('a[href*="IDAkrIPTS"]'):
  cells=a.find_parent('tr').find_all('td',recursive=False)
  if len(cells)<3:continue
  name=a.get_text(' ',strip=True);state=cells[-1].get_text(' ',strip=True);key=(name.split('(Nama Lama')[0].strip().casefold(),state)
  source=urljoin(url,a['href'])
  if key in records:
   if source not in records[key]['sources']:records[key]['sources'].append(source)
  else:records[key]={'id':'mqa-'+a['href'].split('=')[-1],'name':name.split('(Nama Lama')[0].strip(),'state':state,'sector':'Public' if p.name=='mqa-0.html' else 'Private / foreign branch','sources':[source]}
raw=(work/'universities-wikidata.json').read_bytes();universities=[];seen=set()
for row in json.loads(raw)['results']['bindings']:
 lon,lat=map(float,re.findall(r'-?\d+(?:\.\d+)?',row['coord']['value']));qid=row['item']['value'].split('/')[-1]
 if not(99<lon<120 and 0<lat<8) or qid in seen:continue
 seen.add(qid);universities.append({'id':'uni-'+qid,'name':row['itemLabel']['value'],'longitude':lon,'latitude':lat,'source':'https://www.wikidata.org/wiki/'+qid,'kind':'university','model':'campus'})
landmarks=[];models={'Q83063':'twins','Q745016':'tower','Q7969454':'spire','Q822518':'pagoda','Q60967':'mountain'}
rawLand=(work/'landmarks-wikidata.json').read_bytes()
for qid,e in json.loads(rawLand)['entities'].items():
 c=e['claims']['P625'][0]['mainsnak']['datavalue']['value'];landmarks.append({'id':'landmark-'+qid,'name':e['labels']['en']['value'],'longitude':c['longitude'],'latitude':c['latitude'],'source':'https://www.wikidata.org/wiki/'+qid,'kind':'landmark','model':models[qid]})
data={'retrievedAt':stamp,'coordinatePublisher':'Wikidata contributors','coordinateLicense':'CC0','coordinateSha256':hashlib.sha256(raw).hexdigest(),'landmarkSha256':hashlib.sha256(rawLand).hexdigest(),'registrySources':sources,'coverage':'All rows fetched from MQA public and private university register pages, deduplicated by current name and state. Includes campuses; excludes the separate university-college/college directories. MQR is a programme register, not a guarantee of all currently operating institutions. Wikidata points are separate, community-maintained institution coordinates, not verified campus entrances.','institutions':sorted(records.values(),key=lambda x:x['name']),'places':universities+landmarks}
(root/'public/data/malaysia-places.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8');print(len(records),'directory records',len(universities),'coordinate records',len(landmarks),'landmarks')
