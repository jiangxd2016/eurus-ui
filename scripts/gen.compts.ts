import { rollup } from 'rollup'
import Config from './gen.config'

async function build(option) {
  const bundle = await rollup(option)
  await bundle.generate(option.output)
  await bundle.write(option.output)
}

export async function buildCompts(): Promise<void> {
  return Config.forEach(async(i) => {
    await build(i)
  })
}
