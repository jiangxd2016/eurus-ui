import { useData } from 'vitepress'

/**
 * Join two paths by resolving the slash collision.
 */
 export function joinPath(base: string, path: string): string {
  return `${base}${path}`.replace(/\/+/g, '/')
}

export function useUrl() {
  const { site} = useData()

  function withBase(path: string): string {
    return joinPath(site.value.base, path)
  }

  return {
    withBase,
  }
}
