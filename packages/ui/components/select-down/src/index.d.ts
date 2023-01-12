import type { PropType } from 'vue';
import './style.scss';
import type { Size } from '@/components/_utils/size';
declare const _default: import('vue').DefineComponent<{
  modelValue: {
    type: PropType<string[] | number[]>;
    default: () => never[];
  };
  width: StringConstructor;
  size: {
    type: PropType<Size>;
    default: string;
  };
  placeholder: StringConstructor;
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ('input' | 'blur' | 'change' | 'focus' | 'update:modelValue' | 'clear' | 'delete')[], 'input' | 'blur' | 'change' | 'focus' | 'update:modelValue' | 'clear' | 'delete', import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  modelValue: {
    type: PropType<string[] | number[]>;
    default: () => never[];
  };
  width: StringConstructor;
  size: {
    type: PropType<Size>;
    default: string;
  };
  placeholder: StringConstructor;
  disabled: {
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
  onDelete?: ((...args: any[]) => any) | undefined;
}, {
  size: Size;
  disabled: boolean;
  modelValue: string[] | number[];
}>;
export default _default;
