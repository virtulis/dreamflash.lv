import { parse, resolve } from 'path';
import { readdirSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import * as gm from 'gm';

const photosDir = resolve(__dirname, '../src/img/photos');
const thumbsDir = resolve(__dirname, '../src/img/thumbs');

if (!existsSync(thumbsDir)) mkdirSync(thumbsDir);

const thumb = (fn: string, size: number) => new Promise((res, rej) => gm(`${photosDir}/${fn}`)
	.resize(size, size, '^')
	.quality(97)
	.write(`${thumbsDir}/${parse(fn).name}.${size}.jpg`, err => err ? rej(err) : res())
);

readdirSync(thumbsDir).forEach(fn => unlinkSync(`${thumbsDir}/${fn}`));

Promise.all(
	readdirSync(photosDir).map(fn => thumb(fn, 500))
).then(() => process.exit(0), e => { console.error(e); process.exit(1); });
