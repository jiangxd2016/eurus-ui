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
export default function EurusUIReslove(options?: EurusUIResolverOptions): {
  type: string;
  resolve: (name: string) => {
    name: string;
    from: string;
    sideEffects: (string | false)[] | undefined;
  } | undefined;
}[];
