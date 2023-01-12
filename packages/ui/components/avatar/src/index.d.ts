import type { PropType } from 'vue';
import './style.scss';
import type { Size } from '@/components/_utils/size';
declare const _default: import('vue').DefineComponent<{
  size: {
    type: PropType<Size>;
    default: string;
  };
  color: {
    type: StringConstructor;
    default: string;
  };
  offline: {
    type: BooleanConstructor;
    default: boolean;
  };
  online: {
    type: BooleanConstructor;
    default: boolean;
  };
  notice: {
    type: BooleanConstructor;
    default: boolean;
  };
  count: {
    type: NumberConstructor;
    default: number;
  };
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  size: {
    type: PropType<Size>;
    default: string;
  };
  color: {
    type: StringConstructor;
    default: string;
  };
  offline: {
    type: BooleanConstructor;
    default: boolean;
  };
  online: {
    type: BooleanConstructor;
    default: boolean;
  };
  notice: {
    type: BooleanConstructor;
    default: boolean;
  };
  count: {
    type: NumberConstructor;
    default: number;
  };
}>>, {
  size: Size;
  color: string;
  offline: boolean;
  online: boolean;
  notice: boolean;
  count: number;
}>;
export default _default;
