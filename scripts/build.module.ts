import ora from 'ora'
import { compileTS, genTypes } from './build'
import { isEsm } from './constants'
import { buildCompts } from './gen.compts'
;(async () => {
  const spinner = ora(`start build ${isEsm ? 'esm' : 'cjs'}\n`).start()
  Promise.all([compileTS(), genTypes(), buildCompts()])
    .then(() => spinner.succeed(`build ${isEsm ? 'esm' : 'cjs'} Success !\n`))
    .catch((e) => spinner.fail(`${e} !\n`))
})()
