import './style.scss';
declare const _default: import('vue').DefineComponent<{
  modelValue: {
    type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
    default: boolean;
  };
  defaultValue: {
    type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
    default: boolean;
  };
  value: {
    type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
    default: boolean;
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
  label: {
    type: StringConstructor;
    default: string;
  };
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  modelValue: {
    type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
    default: boolean;
  };
  defaultValue: {
    type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
    default: boolean;
  };
  value: {
    type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
    default: boolean;
  };
  disabled: {
    type: BooleanConstructor;
    default: boolean;
  };
  label: {
    type: StringConstructor;
    default: string;
  };
}>>, {
  label: string;
  value: string | number | boolean;
  disabled: boolean;
  modelValue: string | number | boolean;
  defaultValue: string | number | boolean;
}>;
export default _default;
