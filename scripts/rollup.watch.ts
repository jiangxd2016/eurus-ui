import chokidar from 'chokidar'
import { srcPath } from './constants'

import { buildCompts } from './gen.compts'
import { compileTS, genTypes } from './build'
function watchSrc() {
  chokidar
    .watch(srcPath, {
      ignored: ['/**/demo/*', '/**/*.md', '/**/__test__/*'],
    })
    .on('all', (event, path) => {
      if (event === 'change') {
        console.log('update change \n')
        if (path.includes('packages')) {
          buildCompts()
        } else {
          compileTS()
          genTypes()
        }
      }
    })
}

;(async () => {
  await buildCompts()
  await genTypes()
  await compileTS()

  console.log(' ✨ start watch change ...\n')
  watchSrc()
})()
