import {readFileSync,existsSync,mkdirSync,copyFileSync,unlinkSync} from 'node:fs';import {execFileSync} from 'node:child_process';
const rows=JSON.parse(readFileSync('scripts/achievement-art.json'));mkdirSync('output/achievement-originals',{recursive:true});
for(const row of rows){const webp='dist/'+row.image,png=webp.replace('.webp','.png');if(existsSync(png)){copyFileSync(png,'output/achievement-originals/'+png.split('/').at(-1));execFileSync('ffmpeg',['-v','error','-y','-i',png,'-c:v','libwebp','-quality','85','-compression_level','6',webp]);unlinkSync(png);}if(!existsSync(webp))throw Error('Missing '+row.image);}
console.log('10 independently generated achievement images encoded without cropping.');
