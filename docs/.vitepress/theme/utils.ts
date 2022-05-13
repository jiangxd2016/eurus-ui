export const hashRE = /#.*$/
export const extRE = /(index)?\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^[a-z]+:/i

export function isNullish(value: any): value is null | undefined {
  return value === null || value === undefined
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

export function isExternal(path: string): boolean {
  return outboundRE.test(path)
}

export function isActive(route: any, path?: string): boolean {
  if (path === undefined) { return false }

  const routePath = normalize(route.path)
  const pagePath = normalize(path)

  return routePath === pagePath
}

export function normalize(path: string): string {
  return decodeURI(path).replace(hashRE, '').replace(extRE, '')
}

export function joinUrl(base: string, path: string): string {
  const baseEndsWithSlash = base.endsWith('/')
  const pathStartsWithSlash = path.startsWith('/')

  if (baseEndsWithSlash && pathStartsWithSlash) { return base.slice(0, -1) + path }

  if (!baseEndsWithSlash && !pathStartsWithSlash) { return `${base}/${path}` }

  return base + path
}

export function getPathDirName(path: string): string {
  const segments = path.split('/')

  if (segments[segments.length - 1]) { segments.pop() }

  return ensureEndingSlash(segments.join('/'))
}

export function ensureSlash(path: string): string {
  return ensureEndingSlash(ensureStartingSlash(path))
}

export function ensureStartingSlash(path: string): string {
  return /^\//.test(path) ? path : `/${path}`
}

export function ensureEndingSlash(path: string): string {
  return /(\.html|\/)$/.test(path) ? path : `${path}/`
}

/**
 * Remove `.md` or `.html` extention from the given path. It also converts
 * `index` to slush.
 */
export function removeExtention(path: string): string {
  return path.replace(/(index)?(\.(md|html))?$/, '') || '/'
}
export function submitCodepen(data: {
  template: string;
  script: string;
  styles: string;
}) {
  const resourcesTpl = `
<script src="//unpkg.com/vue@next"><\/script>
<script src="//unpkg.com/mand-mobile-next/dist/lib/mand-mobile.full.js"><\/script>
  `

  const htmlTpl = `
${resourcesTpl}
<div id="app">
${decodeURIComponent(data.template)}
</div>
    `
  const cssTpl = `
@import url("//unpkg.com/mand-mobile-next/dist/lib/mand-mobile-next.full.css");
${(decodeURIComponent(data.styles) || '').trim()}
  `
  let jsTpl = data.script
    ? decodeURIComponent(data.script)
      .replace(/export default/, 'var Main =')
      .trim()
      .replace(
        /import ({.*}) from \\?("|')vue\\?("|')/g,
        (s, s1) => `const ${s1} = Vue`
      )
      .replace(
        /import {?.*}? from \\?("|')mand-mobile-next\/(\w+-?\w+)\\?("|')(;?)/g,
        (s, s1, s2) =>
            `const {${s2
              .replace(/\w/, (s: any) => s.toUpperCase())
              .replace(/-(\w)/, (s: any, s1: string) =>
                s1.toUpperCase()
              )}} = MandMobile`
      )
    : 'var Main = {}'
  jsTpl += `
;const app = Vue.createApp(Main);
app.use(MandMobile);
app.mount("#app")
  `

  const payload = {
    js: jsTpl,
    css: cssTpl,
    html: htmlTpl
  }
  const form = document.createElement('form')

  form.method = 'POST'
  form.action = 'https://codepen.io/pen-US/define/'
  form.target = '_blank'
  form.style.display = 'none'

  const input = document.createElement('input')
  input.setAttribute('name', 'data')
  input.setAttribute('type', 'hidden')
  input.setAttribute('value', JSON.stringify(payload))

  form.append(input)
  document.body.append(form)
  form.submit()
  form.remove()
}
