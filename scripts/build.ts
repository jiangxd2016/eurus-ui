import path from 'path'
import fs from 'fs'
import process from 'process'
import type { SourceFile } from 'ts-morph'
import { Project } from 'ts-morph'
import type { BuildOptions } from 'typescript'
import ts from 'typescript'
import { build } from 'esbuild'
import { filePaths, isEsm, outDir, tsModuleConfig } from './constants'

const cwd = process.cwd()

const TSCONFIG_PATH = path.resolve(cwd, tsModuleConfig)
/**
 * fork from https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
export async function genTypes(): Promise<void> {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })

  const sourceFiles: SourceFile[] = []

  await Promise.all(
    filePaths.map(async (file) => {
      if (file.endsWith('.ts') && !file.includes('packages')) {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    })
  )

  project.emitToMemory()

  for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput()
    for (const outputFile of emitOutput.getOutputFiles()) {
      const filepath = outputFile.getFilePath()

      await fs.promises.mkdir(path.dirname(filepath), {
        recursive: true,
      })
      await fs.promises.writeFile(filepath, outputFile.getText(), 'utf8')
    }
  }
}

// fork from  https://github.com/a7ul/esbuild-node-tsc

export type Config = Partial<{
  outDir: string
  tsConfigFile?: string
  esbuild: {
    entryPoints?: string[]
    minify?: boolean
    target?: string
    plugins?: Plugin[]
    format?: 'cjs' | 'esm'
  }
  assets: {
    baseDir?: string
    outDir?: string
    filePatterns?: string[]
  }
}>

function getTSConfig(_tsConfigFile = 'tsconfig.json') {
  const tsConfigFile = ts.findConfigFile(cwd, ts.sys.fileExists, _tsConfigFile)
  if (!tsConfigFile) throw new Error(`tsconfig.json not found in the current directory! ${cwd}`)

  const configFile = ts.readConfigFile(tsConfigFile, ts.sys.readFile)
  const tsConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, cwd)
  return { tsConfig, tsConfigFile }
}

type TSConfig = ReturnType<typeof getTSConfig>['tsConfig']

function esBuildSourceMapOptions(tsConfig: TSConfig) {
  const { sourceMap, inlineSources, inlineSourceMap } = tsConfig.options

  // inlineSources requires either inlineSourceMap or sourceMap
  if (inlineSources && !inlineSourceMap && !sourceMap) return false

  // Mutually exclusive in tsconfig
  if (sourceMap && inlineSourceMap) return false

  if (inlineSourceMap) return 'inline'

  return sourceMap
}

function getBuildMetadata() {
  const { tsConfig, tsConfigFile } = getTSConfig(tsModuleConfig)

  const sourcemap = esBuildSourceMapOptions(tsConfig)
  const target = tsConfig?.raw?.compilerOptions?.target || 'es6'
  const minify = false

  const format = isEsm ? 'esm' : 'cjs'

  const esbuildOptions: BuildOptions = {
    outdir: outDir,
    entryPoints: filePaths,
    sourcemap,
    target,
    minify,
    tsconfig: tsConfigFile,
    format,
  }

  const assetPatterns = ['**']

  const assetsOptions = {
    baseDir: 'src',
    outDir,
    patterns: [...assetPatterns, '!**/*.{ts,js,tsx,jsx}'],
  }

  return { outDir, esbuildOptions, assetsOptions }
}

async function buildSourceFiles(esbuildOptions: Partial<BuildOptions>) {
  return await build({
    bundle: false,
    external: ['src/packages/*'],
    ...esbuildOptions,
  })
}

export async function compileTS() {
  const { esbuildOptions } = getBuildMetadata()
  await buildSourceFiles(esbuildOptions)
}
