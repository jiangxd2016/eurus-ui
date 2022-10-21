import path from 'path';
import fs from 'fs';
import klawSync from 'klaw-sync';
const PACKAGES_PATH = path.resolve(
  path.resolve(),
  './src/packages'
);

export const componentEntry = klawSync(PACKAGES_PATH, {
  nofile: true,
  depthLimit: 0,
}).map(dir => dir.path + '/index.ts');

function genDocs(lang = 'zh-CN') {
  const descDir = path.resolve(
    process.cwd(),
    `docs/${lang}/`
  );

  fs.mkdirSync(descDir, {
    recursive: true,
  });
  fs.copyFileSync(
    path.resolve(process.cwd(), 'CHANGELOG.md'),
    path.resolve(descDir, 'guider/changelog.md')
  );
  fs.copyFileSync(
    path.resolve(
      process.cwd(),
      lang === 'zh-CN' ? 'README.zh-CN.md' : 'README.md'
    ),
    path.resolve(descDir, 'guider/quick-start.md')
  );
  componentEntry.forEach((item) => {
    const name = path.basename(path.dirname(item));
    fs.existsSync(
      path.resolve(
        path.dirname(item),
        lang === 'zh-CN' ? 'README.zh-CN.md' : 'README.md'
      )
    )
      && fs.copyFileSync(
        path.resolve(
          path.dirname(item),
          lang === 'zh-CN' ? 'README.zh-CN.md' : 'README.md'
        ),
        path.resolve(descDir, 'components/' + name + '.md')
      );
  });
}

genDocs();
genDocs('en-US');
