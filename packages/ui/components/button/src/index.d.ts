import type { ButtonHTMLAttributes, PropType } from 'vue';
import './style.scss';
import type { Size } from '@/components/_utils/size';
export type Type = 'default' | 'text' | 'primary' | 'info' | 'success' | 'warning' | 'error' | 'purple';
declare const _default: import('vue').DefineComponent<{
  type: {
    type: PropType<Type>;
    default: string;
  };
  size: {
    type: PropType<Size>;
    default: string;
  };
  loading: {
    type: BooleanConstructor;
    default: boolean;
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
  round: {
    type: BooleanConstructor;
    default: boolean;
  };
  plain: {
    type: BooleanConstructor;
    default: boolean;
  };
  circle: {
    type: BooleanConstructor;
    default: boolean;
  };
  native: {
    type: PropType<ButtonHTMLAttributes>;
    default: {};
  };
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, 'click'[], 'click', import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  type: {
    type: PropType<Type>;
    default: string;
  };
  size: {
    type: PropType<Size>;
    default: string;
  };
  loading: {
    type: BooleanConstructor;
    default: boolean;
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
  round: {
    type: BooleanConstructor;
    default: boolean;
  };
  plain: {
    type: BooleanConstructor;
    default: boolean;
  };
  circle: {
    type: BooleanConstructor;
    default: boolean;
  };
  native: {
    type: PropType<ButtonHTMLAttributes>;
    default: {};
  };
}>> & {
  onClick?: ((...args: any[]) => any) | undefined;
}, {
  size: Size;
  type: Type;
  circle: boolean;
  round: boolean;
  loading: boolean;
  disabled: boolean;
  plain: boolean;
  native: ButtonHTMLAttributes;
}>;
export default _default;
