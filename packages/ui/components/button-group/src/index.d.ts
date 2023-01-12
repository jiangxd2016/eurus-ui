import type { PropType } from 'vue';
import './style.scss';
import type { Size } from '@/components/_utils/size';
declare const _default: import('vue').DefineComponent<{
  vertical: {
    type: BooleanConstructor;
    default: boolean;
  };
  size: {
    type: PropType<Size>;
    default: string;
  };
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  vertical: {
    type: BooleanConstructor;
    default: boolean;
  };
  size: {
    type: PropType<Size>;
    default: string;
  };
}>>, {
  size: Size;
  vertical: boolean;
}>;
export default _default;
