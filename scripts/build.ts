
import configProd from "./vite.prod"
import configDev from "./vite.dev";
import configAll from "./vite.all"
import { build } from 'vite';
import genVersion from "./gen-version";

const nodeEnv = process.env.NODE_ENV;
console.log(`[vite lib css] ${nodeEnv}`);

let config = configDev;

if(nodeEnv === "all"){
  config = configAll
}
if(nodeEnv === "compts"){
  config = configProd
}
async function run() {
  await genVersion();
  await build(config);
}

run()
