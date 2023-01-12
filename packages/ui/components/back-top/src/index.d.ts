import type { PropType } from 'vue';
import './style.scss';
declare const _default: import('vue').DefineComponent<{
  text: {
    type: StringConstructor;
    default: string;
  };
  target: {
    type: PropType<string | HTMLElement>;
    default: string;
  };
  height: {
    default: number;
  };
  bottom: {
    default: number;
  };
  right: {
    default: number;
  };
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, 'click'[], 'click', import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  text: {
    type: StringConstructor;
    default: string;
  };
  target: {
    type: PropType<string | HTMLElement>;
    default: string;
  };
  height: {
    default: number;
  };
  bottom: {
    default: number;
  };
  right: {
    default: number;
  };
}>> & {
  onClick?: ((...args: any[]) => any) | undefined;
}, {
  text: string;
  target: string | HTMLElement;
  height: number;
  bottom: number;
  right: number;
}>;
export default _default;
