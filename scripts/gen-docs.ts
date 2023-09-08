import path from 'node:path';
import fs from 'node:fs';

function readDirName(pathUrl: string) {
	const files = fs.readdirSync(pathUrl);
	const result: string[] = [];
	files.forEach(item => {
		const stat = fs.statSync(path.join(pathUrl, item));
		if (stat.isDirectory()) {
			result.push(item);
		}
	});
	return result;
}

const PACKAGES_PATH = path.resolve(path.resolve(), './src/packages');

export const componentEntry = readDirName(PACKAGES_PATH);

export function genDocs(lang = 'zh') {
	const descDir = path.resolve(process.cwd(), `docs/${lang}/`);

	fs.mkdirSync(descDir, {
		recursive: true,
	});
	fs.copyFileSync(
		path.resolve(process.cwd(), 'CHANGELOG.md'),
		path.resolve(descDir, 'guider/changelog.md'),
	);
	fs.copyFileSync(
		path.resolve(process.cwd(), lang === 'zh' ? 'README.zh-CN.md' : 'README.md'),
		path.resolve(descDir, 'guider/quick-start.md'),
	);
	componentEntry.forEach(item => {
		fs.existsSync(
			path.resolve(PACKAGES_PATH, item, lang === 'zh' ? 'README.zh-CN.md' : 'README.md'),
		) &&
			fs.copyFileSync(
				path.resolve(PACKAGES_PATH, item, lang === 'zh' ? 'README.zh-CN.md' : 'README.md'),
				path.resolve(descDir, 'components/' + item + '.md'),
			);
	});
}

genDocs();
genDocs('en');
