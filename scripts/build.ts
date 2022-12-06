import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { build } from 'vite';
import viteDev from './vite.dev';
import configProd from './vite.prod';
import configAll from './vite.all';
import { compileToCSS } from './gen-scss';
const execPromise = promisify(exec);

const args = process.argv.slice(2);
const nodeEnv = args[0];
console.log(`[eurus-ui env] ${nodeEnv}`);

// complie
(async () => {
  if (nodeEnv === 'dev') {
    await build(viteDev);
    console.log('[eurus-ui build]: start build css');
    compileToCSS(nodeEnv);
    console.log('[eurus-ui build]: start build type');
    await execPromise('npm run build:types-esm');

  } else {
    await build(configProd);
    await build(configAll);
    console.log('[eurus-ui build]: start build css');
    compileToCSS(nodeEnv);
    console.log('[eurus-ui build]: start build type');
    await execPromise('npm run build:types');

  }
  // console.log('[eurus-ui build]: start build css');

  console.log('[eurus-ui build]: ✨ build done');
})();
