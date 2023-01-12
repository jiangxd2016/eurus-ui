import type { PropType } from 'vue';
import './style.scss';
declare const _default: import('vue').DefineComponent<{
  modelValue: {
    type: PropType<string | boolean>;
    default: boolean;
  };
  defaultChecked: {
    type: BooleanConstructor;
    default: boolean;
  };
  value: {
    type: PropType<string | number>;
  };
  label: {
    type: StringConstructor;
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  modelValue: {
    type: PropType<string | boolean>;
    default: boolean;
  };
  defaultChecked: {
    type: BooleanConstructor;
    default: boolean;
  };
  value: {
    type: PropType<string | number>;
  };
  label: {
    type: StringConstructor;
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
}>>, {
  disabled: boolean;
  modelValue: string | boolean;
  defaultChecked: boolean;
}>;
export default _default;
