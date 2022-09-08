import { hyphenate } from '@estjs/tools';

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
  // TODO: datePicker和rangePicker css文件名不一致，需要修改
  if (names === 'dateRangePicker' || names === 'date-range-picker') {
    names = 'date-picker';
  }
  if (names === 'carousel-item' || names === 'tabs-pane') {
    return [];
  }
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

// TODO: 需要返回 autoImport 所需类型,暂时用any
export function EurusUIReslove(options: EurusUIResolverOptions = {}): any {
  return [
    {
      type: 'component',
      resolve: (name: string) => {
        if (!name || name === 'step' ) {
          return;
        }
        if (name.match(/^(E[A-Z]|n-[a-z])/)) {
          const names = hyphenate(name.slice(1));

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
