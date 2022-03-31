interface ImportMeta {
  globEager<T = unknown>(globPath: string): Record<string, T>[]
}
