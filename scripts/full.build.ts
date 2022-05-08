import { defineConfig, rollup } from 'rollup'
import { defaultBuildConfig } from './rollup.config'
import { defaultInput, defaultOutput, file, name } from './constants'

async function build(option) {
  // create a bundle
  const bundle = await rollup(option)
  await bundle.generate(option.output)
  await bundle.write(option.output)
}

const Config = defineConfig([
  {
    ...defaultBuildConfig(defaultInput, defaultOutput),
    output: {
      name,
      file: file('esm'),
      format: 'es',
    },
  },
  {
    ...defaultBuildConfig(defaultInput, defaultOutput),
    output: {
      name,
      file: file('umd'),
      format: 'umd',
      globals: {
        vue: 'Vue',
        // 'lodash-es': '_',
      },
    },
  },
])

Config.forEach(async(i) => {
  await build(i)
})
