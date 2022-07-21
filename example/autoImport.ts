export interface EurusUIResolverOptions {
  /**
   * import style along with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass';

  /**
   * auto import for directives
   *
   * @default true
   */
  directives?: boolean;

  /**
   * atomic imports
   *
   *  @default true
   */
  atomic?: boolean;

}

function getSideEffectsLegacy(
  names: string,
  options: EurusUIResolverOptions,
) {
  const { importStyle = 'css', atomic = true } = options;

  if (importStyle === 'sass') {
    return [
      'eurus-ui/dist/css/base.scss',
      atomic && 'eurus-ui/dist/css/atomic.scss',
      `eurus-ui/dist/es/packages/${names.toLowerCase()}/src/style.css`
    ].filter(Boolean);
  } else if (importStyle === true || importStyle === 'css') {
    return [
      'eurus-ui/dist/css/base.css',
      atomic && 'eurus-ui/dist/css/atomic.css',
      `eurus-ui/dist/es/packages/${names.toLowerCase()}/src/style.css`
    ].filter(Boolean);
  }
}
const directives: Record<string, { importName: string; styleName: string }> = {
  Loading: { importName: 'vLoading', styleName: 'loading' },
};

export function EurusUIReslove(options: EurusUIResolverOptions = {}) {
  return [
    {
      type: 'component',
      resolve: (name: string) => {

        if (name.match(/^(E[A-Z]|n-[a-z])/)) {
          const names = name.slice(1);
          if (name === 'step') {
            return;
          }
          return {
            name,
            from: 'eurus-ui',
            sideEffects: getSideEffectsLegacy(names.toLowerCase(), options),
          };
        }
      },
    },
    {
      type: 'directive',
      resolve: (name: string) => {

        const directive = directives[name];
        if (!directive) { return; }
        return {
          name: directive.importName,
          from: 'eurus-ui',
          sideEffects: getSideEffectsLegacy(directive.styleName, options),
        };
      },
    },
  ];
}
