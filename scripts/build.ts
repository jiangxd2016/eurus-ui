

import { build } from 'vite';
import { InlineConfig } from "vite";
import chokidar from "chokidar"
import {exec} from "child_process";


import configDev from "./vite.dev";
import configProd from "./vite.prod"
import configAll from "./vite.all"

import genVersion from "./gen-version";


const nodeEnv = process.env.NODE_ENV;
console.log(`[vite build env] ${nodeEnv}`);

const config: InlineConfig[] = [configProd, nodeEnv === "all" && configAll].filter(Boolean);

async function run() {

  await genVersion();

  if (nodeEnv) {
    await Promise.all(config.map(item => build(item)));
  }else{
   await build(configDev);
    const watcher = chokidar.watch('src/**/*', {
      ignored: ["**/demo/*.vue","**/*.md","**/*.spec.ts"], // ignore dotfiles
      persistent: true,
      interval: 1000,
    });
    watcher.on('change', ()=>{
        build(configDev);
      })
  }

  // genrate type
  exec("npm run build-types")

}

run()
