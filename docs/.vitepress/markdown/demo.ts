// @ts-check
import viteConfig from '../../vite.config'

const fs = require('fs')

const klawSync = require('klaw-sync')
const stylus = require('stylus')
const esbuild = require('esbuild')
const minimist = require('minimist')
const vueSfc = require('@vue/compiler-sfc')

const resolve = require('path').resolve
const { parse, compileScript } = vueSfc
const transformSync = esbuild.transformSync

const chalk = require('chalk')
const prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')
// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

let insertStyleList: string[] = []
const matchHtmlRegExp = /["&'<>]/

interface MarkdownParsedData {
  hoistedTags?: string[];
  links?: string[];
  headers?: any[];
  component?: Array<{
    name: string;
    path: string;
    glob?: boolean;
  }>;
}

const argv: any = minimist(process.argv.slice(2))
const command = argv._[0]
const root = argv._[command ? 1 : 0]
const anchor = '&-&'
const RE = /^<(script|style)(?=(\s|>|$))/i
const DEMO_RE = /^<demo\s+.+\s?\/?>?/
const COMPTS_RE = /(?<={).*(?=})/g
const DEMOS_RE = /^<demo-wrapper\s+.+\s?\/?>?/
const DEMO_PATH_RE = /src=("|').*("|')/

module.exports = { demo: demoPlugin }

function demoPlugin(md: any, resolver: any) {
  insertStyleList = []
  md.renderer.rules.html_inline = (tokens: any, idx: any) => {
    const content = tokens[idx].content
    const data = (md as any).__data as MarkdownParsedData
    const components = data.component || (data.component = [])
    return replaceContent(content, components)
  }

  md.renderer.rules.html_block = (tokens: any, idx: any) => {
    const content = tokens[idx].content
    const data = (md as any).__data as MarkdownParsedData
    const hoistedTags = data.hoistedTags || (data.hoistedTags = [])
    const components = data.component || (data.component = [])
    if (RE.test(content.trim())) {
      hoistedTags.push(content)
      return ''
    } else {
      return replaceContent(content, components)
    }
  }
}
function replaceContent(content: string, components: MarkdownParsedData['component']) {
  if (DEMO_RE.test(content.trim()) || DEMOS_RE.test(content.trim())) {
    const demoPath = getDemoTruePath(content.trim())

    if (!demoPath) { return content }

    const { demoCodeStrs, demoCodeRaws, truePath, demoCDNRaws } = demoFileHtmlStr(demoPath)
    const name = 'comp' + (Math.random() * 10000).toFixed(0)
    // const demos = import.meta!.globEager(demoPath + './demo*.vue')
    const demos = klawSync(demoPath, { nodir: true })
      .map((i: any) => i.path)
      .join(anchor)

    components!.push({
      name,
      path: truePath,
      glob: !truePath.endsWith('.vue'),
    })

    return content.replace(
      DEMO_RE.test(content.trim()) ? '<demo' : '<demo-wrapper',
      `${DEMO_RE.test(content.trim()) ? '<demo' : '<demo-wrapper'}
        htmlStrs="${Array.isArray(demoCodeStrs) ? demoCodeStrs.join(anchor) : demoCodeStrs}"
        codeStrs="${Array.isArray(demoCodeRaws) ? demoCodeRaws.join(anchor) : demoCodeRaws}"
        template="${
          Array.isArray(demoCDNRaws)
            ? demoCDNRaws.map(cdn => cdn.template).join(anchor)
            : demoCDNRaws?.template ?? ''
        }"
        script="${
          Array.isArray(demoCDNRaws)
            ? demoCDNRaws.map(cdn => cdn.script).join(anchor)
            : demoCDNRaws?.script ?? ''
        }"
        styles="${
          Array.isArray(demoCDNRaws)
            ? demoCDNRaws.map(cdn => cdn.styles).join(anchor)
            : demoCDNRaws?.styles ?? ''
        }"
        ${DEMO_RE.test(content.trim()) ? `:demo="${name}"` : `demos="${demos}"`}
      `
    )
  }

  return content
}

function getDemoTruePath(content: string) {
  const demoPath = content.match(DEMO_PATH_RE)?.[0]?.split('"')[1]
  return demoPath
}

function demoFileHtmlStr(path: string) {
  const truePath
    = path.startsWith('./') || path.startsWith('../')
      ? resolve(root, path)
      : resolve(process.cwd(), path)

  if (!truePath.endsWith('.vue')) {
    const demoEntries = klawSync(path, {
      nodir: true,
      depthLimit: 0,
    })
      .filter((p: any) => p.path.endsWith('.vue'))
      .map((p: any) => p.path)

    const demoCodeStrs = demoEntries.map((p: string) => {
      const codeStr = fs.readFileSync(p, 'utf-8')
      const htmlStr = encodeURIComponent(highlight(codeStr, 'vue'))

      return htmlStr.replaceAll('\'', '&')
    })

    const demoCodeRaws = demoEntries.map((p: string) => {
      return encodeURIComponent(fs.readFileSync(p, 'utf-8')).replaceAll('\'', '&')
    })

    const demoCDNRaws = demoEntries.map((p: string) => {
      return compileDemo(fs.readFileSync(p, 'utf-8'))
    })

    return {
      demoCodeStrs,
      demoCodeRaws,
      truePath,
      demoCDNRaws,
    }
  } else {
    const content = fs.readFileSync(truePath, 'utf-8')

    const htmlStr = encodeURIComponent(highlight(content, 'vue')).replaceAll('\'', '&')
    return {
      demoCodeStrs: htmlStr,
      demoCodeRaws: encodeURIComponent(content).replaceAll('\'', '&'),
      demoCDNRaws: compileDemo(content),
      truePath,
    }
  }
}

function compileDemo(content: string) {
  
  console.log('======================')
  console.log(content)
  console.log('======================')
  const result = parse(content)

  const tpl = result.descriptor.template?.content ?? ''
  const script = result.descriptor.script?.content ?? ''
  const setup = result.descriptor.scriptSetup?.content ?? ''

  const autoImportStyle: string[] = []
  try {
    const alias = viteConfig?.resolve?.alias
    if (alias) {
      Object.keys(alias).forEach((key) => {
        setup?.match(COMPTS_RE).forEach((i) => {
          const comptName = i.trim().slice(1).toLocaleLowerCase()
          console.log({ insertStyleList })
          if (!insertStyleList.includes(comptName)) {
            insertStyleList.push(comptName)
            const style = fs.readFileSync(
              alias[key] + 'packages/' + comptName + '/index.css',
              'utf-8'
            )
            console.log('reload style', style);
            
            style && autoImportStyle.push(style)
          }
        })
      })
    }
  } catch (error) {
    console.log(error)
  }

  const styles
    = result.descriptor.styles?.map((s: any) => {
      if (s.lang === 'stylus') {
        return stylus(s.content).render()
      }
      return s.content
    }) ?? []

  styles.push(...autoImportStyle)

  const scriptResult = result.descriptor.script
    ? compileScript(
      parse(
          `
      <script>
      ${transformSync(script, { loader: 'ts' }).code}
      <\/script>
      <script setup>
      ${transformSync(setup, { loader: 'ts' }).code}
      <\/script>
    `
      ).descriptor,
      {
        id: Math.random().toString(36).slice(2, 11),
      }
    )
    : { content: '' }

  console.log({ styles })
  return {
    template: encodeURIComponent(tpl),
    script: encodeURIComponent(scriptResult.content),
    styles: encodeURIComponent(styles.join(anchor)),
  }
}

/**
 * Escape special characters in the given str of html.
 *
 * @param  {str} str The str to escape for inserting into HTML
 * @return {str}
 * @public
 */

function escapeHtml(str: string) {
  var str = '' + str
  const match = matchHtmlRegExp.exec(str)

  if (!match) {
    return str
  }

  let escape
  let html = ''
  let index = 0
  let lastIndex = 0

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;'
        break
      case 38: // &
        escape = '&amp;'
        break
      case 39: // '
        escape = '&#39;'
        break
      case 60: // <
        escape = '&lt;'
        break
      case 62: // >
        escape = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substr(lastIndex, index)
    }

    lastIndex = index + 1
    html += escape
  }

  return lastIndex !== index ? html + str.substr(lastIndex, index) : html
}

function wrap(code: string, lang: string): string {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  return `<pre v-pre><code>${code}</code></pre>`
}

const highlight = (str: string, lang: string) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'py') {
    lang = 'python'
  }
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch {
      console.warn(
        chalk.yellow(`[vitepress] Syntax highlight for language "${lang}" is not supported.`)
      )
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}
