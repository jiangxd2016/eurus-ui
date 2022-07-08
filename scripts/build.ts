import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import type { InlineConfig } from 'vite';
import { build } from 'vite';
import chokidar from 'chokidar';

import pkg from '../package.json';

import configDev from './vite.dev';
import configProd from './vite.prod';
import configAll from './vite.all';

const srcPath = path.join(path.resolve(), 'src');

async function genVersion() {
  const version = pkg.version;
  await fs.writeFileSync(path.resolve(srcPath, 'version.ts'), `export default '${version};'\n`);
}

const args = process.argv.slice(2);
const nodeEnv = args[0];
console.log(`[eurus-ui env] ${nodeEnv}`);

const config = [configProd, nodeEnv === 'all' && configAll].filter(Boolean) as InlineConfig[];

async function run() {

  await genVersion();
  if (nodeEnv) {
    await Promise.all(config.map(item => build(item)));
    console.log('[eurus-ui build]: start build type');
    // genrate type
    exec('npm run build:types');
  } else {
    await Promise.all([configDev, configAll].map(item => build(item)));
    exec('npm run build:types-esm');
    console.log('[eurus-ui dev] start watch change ...');

    const watcher = chokidar.watch('src/**/*', {
      ignored: ['**/demo/*.vue', '**/*.md', '**/*.spec.ts'], // ignore dotfiles
      persistent: true,
      interval: 1000,
    });
    watcher.on('change', async () => {
      await Promise.all([configDev, configAll].map(item => build(item)));
      exec('npm run build:types-esm');
    });
  }
}

run();
