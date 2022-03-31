import path from 'path'
import fg from 'fast-glob'

import { defaultBuildConfig, getPath } from './rollup.config'
import { compRoot } from './constants'

function getPackages() {
  const inputFiles = fg.sync('*', {
    cwd: compRoot,
    onlyDirectories: true,
  })

  return inputFiles
    .map((file) => {
      return {
        path: path.resolve(compRoot, file),
        name: file,
      }
    })
    .map((val) => {
      const { input, output } = getPath(val.name, val.path)
      return defaultBuildConfig(input, output)
    })
}

export default getPackages()
