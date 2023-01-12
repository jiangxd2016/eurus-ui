import type { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<{
  modelValue: {
    type: PropType<(string | number | boolean)[]>;
    default: undefined;
  };
  defaultChecked: {
    type: PropType<(string | number | boolean)[]>;
    default: () => never[];
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  modelValue: {
    type: PropType<(string | number | boolean)[]>;
    default: undefined;
  };
  defaultChecked: {
    type: PropType<(string | number | boolean)[]>;
    default: () => never[];
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
}>>, {
  disabled: boolean;
  modelValue: (string | number | boolean)[];
  defaultChecked: (string | number | boolean)[];
}>;
export default _default;
