import type { PropType } from 'vue';
import './style.scss';
declare const _default: import('vue').DefineComponent<{
  placeholder: {
    type: StringConstructor;
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
  step: {
    type: NumberConstructor;
    default: number;
  };
  max: {
    type: NumberConstructor;
    default: number;
  };
  min: {
    type: NumberConstructor;
    default: number;
  };
  modelValue: {
    type: PropType<number | undefined>;
    default: undefined;
  };
  defaultValue: {
    type: PropType<number | undefined>;
    default: undefined;
  };
  controls: {
    type: BooleanConstructor;
    default: boolean;
  };
  precision: NumberConstructor;
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ('change' | 'update:modelValue')[], 'change' | 'update:modelValue', import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  placeholder: {
    type: StringConstructor;
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
  step: {
    type: NumberConstructor;
    default: number;
  };
  max: {
    type: NumberConstructor;
    default: number;
  };
  min: {
    type: NumberConstructor;
    default: number;
  };
  modelValue: {
    type: PropType<number | undefined>;
    default: undefined;
  };
  defaultValue: {
    type: PropType<number | undefined>;
    default: undefined;
  };
  controls: {
    type: BooleanConstructor;
    default: boolean;
  };
  precision: NumberConstructor;
}>> & {
  onChange?: ((...args: any[]) => any) | undefined;
  'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined;
}, {
  disabled: boolean;
  modelValue: number | undefined;
  defaultValue: number | undefined;
  step: number;
  max: number;
  min: number;
  controls: boolean;
}>;
export default _default;
