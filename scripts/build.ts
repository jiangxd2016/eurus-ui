import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import type { InlineConfig } from 'vite';
import { build } from 'vite';
import chokidar from 'chokidar';

import pkg from '../package.json';

// import configDev from './vite.dev';
import configProd from './vite.prod';
import configAll from './vite.all';

import complieSass from './compile-sass';

const execPromise = promisify(exec);
const srcPath = path.join(path.resolve(), 'src');

async function genVersion() {
  const version = pkg.version;
  await fs.writeFileSync(path.resolve(srcPath, 'version.ts'), `export default '${version}';\n`);
}

const args = process.argv.slice(2);
const nodeEnv = args[0];
console.log(`[eurus-ui env] ${nodeEnv}`);

const configList = [configProd, configAll].filter(Boolean) as InlineConfig[];

// complie
async function buildConfig() {
  await Promise.all(configList.map(item => build(item)));
  console.log('[eurus-ui build]: start build css');
  complieSass();
  console.log('[eurus-ui build]: start build type');
  // genrate type
  await execPromise('npm run build:types');
  console.log('[eurus-ui build]: ✨ build done');
}

async function run() {
  await genVersion();
  if (nodeEnv) {
    await buildConfig();
  } else {
    await buildConfig();
    console.log('[eurus-ui dev] start watch change ...');

    const watcher = chokidar.watch('src/**/*', {
      ignored: ['**/demo/*.vue', '**/*.md', '**/*.spec.ts'], // ignore dotfiles
      persistent: true,
      interval: 1000,
    });
    watcher.on('change', async () => {
      await buildConfig();
    });
  }
}

run();
