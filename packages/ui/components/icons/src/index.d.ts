import type { Component, PropType } from 'vue';
import './style.scss';
import type { Size } from '@/components/_utils/size';
declare const _default: import('vue').DefineComponent<{
  size: {
    type: PropType<number | Size>;
    default: string;
  };
  color: StringConstructor;
  name: PropType<string | undefined>;
}, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
  [key: string]: any;
}> | Component<any, any, any, import('vue').ComputedOptions, import('vue').MethodOptions>, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, 'click'[], 'click', import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  size: {
    type: PropType<number | Size>;
    default: string;
  };
  color: StringConstructor;
  name: PropType<string | undefined>;
}>> & {
  onClick?: ((...args: any[]) => any) | undefined;
}, {
  size: number | Size;
}>;
export default _default;
