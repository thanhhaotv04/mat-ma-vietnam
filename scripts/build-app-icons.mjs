// Export the approved artwork at platform icon sizes. Preserve the entire square; no cropping or redrawing.
import {mkdirSync} from 'node:fs';import {execFileSync} from 'node:child_process';
const source='dist/assets/icon-concepts/03-so-tay-kham-pha.png',target='dist/assets/app-icons';mkdirSync(target,{recursive:true});
for(const size of [32,64,180,192,512,1024])execFileSync('ffmpeg',['-v','error','-y','-i',source,'-vf',`scale=${size}:${size}:flags=lanczos`,'-frames:v','1',`${target}/book-${size}.png`]);
console.log('Exported approved book icon at 32, 64, 180, 192, 512, 1024 pixels.');
