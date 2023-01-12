import type { PropType } from 'vue';
import './style.scss';
import type { Size } from '@/components/_utils/size';
declare const _default: import('vue').DefineComponent<{
  type: {
    type: PropType<'number' | 'text' | 'password'>;
    default: string;
  };
  modelValue: {
    type: PropType<string | number>;
    default: string;
  };
  defaultValue: {
    type: StringConstructor;
    default: string;
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
  size: {
    type: PropType<Size>;
    default: string;
  };
  placeholder: {
    type: StringConstructor;
    default: string;
  };
  maxLength: {
    type: NumberConstructor;
    default: number;
  };
  showWordLimit: {
    type: BooleanConstructor;
    default: boolean;
  };
  clearable: {
    type: BooleanConstructor;
    default: boolean;
  };
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ('input' | 'blur' | 'change' | 'focus' | 'update:modelValue' | 'clear')[], 'input' | 'blur' | 'change' | 'focus' | 'update:modelValue' | 'clear', import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  type: {
    type: PropType<'number' | 'text' | 'password'>;
    default: string;
  };
  modelValue: {
    type: PropType<string | number>;
    default: string;
  };
  defaultValue: {
    type: StringConstructor;
    default: string;
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
  size: {
    type: PropType<Size>;
    default: string;
  };
  placeholder: {
    type: StringConstructor;
    default: string;
  };
  maxLength: {
    type: NumberConstructor;
    default: number;
  };
  showWordLimit: {
    type: BooleanConstructor;
    default: boolean;
  };
  clearable: {
    type: BooleanConstructor;
    default: boolean;
  };
}>> & {
  onFocus?: ((...args: any[]) => any) | undefined;
  onBlur?: ((...args: any[]) => any) | undefined;
  onChange?: ((...args: any[]) => any) | undefined;
  onInput?: ((...args: any[]) => any) | undefined;
  'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined;
  onClear?: ((...args: any[]) => any) | undefined;
}, {
  size: Size;
  type: 'number' | 'text' | 'password';
  disabled: boolean;
  modelValue: string | number;
  defaultValue: string;
  placeholder: string;
  maxLength: number;
  showWordLimit: boolean;
  clearable: boolean;
}>;
export default _default;
