// Encode each independently generated PNG for browser delivery, preserving its full dimensions.
import {readFileSync,writeFileSync,existsSync,mkdirSync,copyFileSync,unlinkSync,statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const manifest=JSON.parse(readFileSync('scripts/individual-art.json'));
mkdirSync('output/card-originals',{recursive:true});let encoded=0;
for(const [id,c] of Object.entries(manifest)){
 const png=`dist/assets/cards/${id}.png`,webp=`dist/assets/cards/${id}.webp`,original=`output/card-originals/${id}.png`;
 if(existsSync(png)&&(!existsSync(webp)||statSync(png).mtimeMs>statSync(webp).mtimeMs)){
  copyFileSync(png,original);
  execFileSync('ffmpeg',['-v','error','-y','-i',png,'-c:v','libwebp','-quality','85','-compression_level','6',webp]);
  encoded++;
 }
 if(existsSync(webp)){c.image=`assets/cards/${id}.webp`;c.status='generated';if(existsSync(png))unlinkSync(png);}
}
writeFileSync('scripts/individual-art.json',JSON.stringify(manifest,null,2));
console.log(`Encoded ${encoded} new individual illustrations. Original PNGs retained in output/card-originals/.`);
