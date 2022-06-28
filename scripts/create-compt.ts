import fs from 'fs';
import path from 'path';

const args = process.argv.splice(2);
const componentPrefix = 'E';
console.log(args);

function firstUpcase(str: string) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/^\S/, s => s.toUpperCase());
}

function renderIndex(name) {
  return `
  import type { App } from 'vue';
  import ${name} from './src';

  ${name}.install = (app: App) => {
    app.component( ${name}.name,  ${name});
  };

  export {  ${name} };
  export default ${name};

  `;
}

function renderSrcIndex(name) {

}

(()=>{
  const name = args[0];
  if (!name) {
    console.warn('please enter component name!');
    return;
  }
  const outPath = path.resolve('src/packages', name);

  if (fs.existsSync(outPath)) {
    console.warn('dir exist!');
    return;
  }
  const comptName = firstUpcase(name);

})();

