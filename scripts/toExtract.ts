import { createFilter } from '@rollup/pluginutils'

export default function inlineToExtract (options:any= {}) {
  const filter = createFilter(options.include, options.exclude)

  return {
    name: 'inline-to-extract',
    transform (code, id) {
      if (!filter(id)) return null
    },
    generateBundle (options_, bundle) {
      const resolveCss = []
      Object.keys(bundle).forEach(name => {
        const bundleItem = bundle[name]
        bundleItem.imports.forEach((item, index) => {
          console.log({item});

          if (/(scss|less)\.js/.test(item)) {
            let code
            code = /"[\s\S^"]*"/igm.exec(bundle[item].code)
            if (code[0]) {
              code = code[0].replace(/\\n/g, '').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
              if (!resolveCss.includes(item)) {
                Object.assign(bundle[item], {
                  fileName: item.replace(/\.(scss|less)\.js/, '.css'),
                  code: code.slice(1, code.length - 1),
                  importedBindings: null,
                  imports: []
                });
                resolveCss.push(item)
              }
              delete bundleItem.importedBindings[item]
              bundleItem.importedBindings[item.replace(/\.(scss|less)\.js/, '.css')] = []
              bundleItem.imports[index] = bundleItem.imports[index].replace(/\.(scss|less)\.js/, '.css')
              bundleItem.code = bundleItem.code.replace(/\.(scss|less)\.js/, '.css')
            }
          }
        })
      })
    }
  }
}
