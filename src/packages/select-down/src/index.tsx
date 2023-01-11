import type {PropType} from 'vue';
import {defineComponent} from 'vue';
import './style.scss';
import type {Size} from '@/packages/_utils/size';
import {getPrefixCls} from '@/packages/_utils/global-config';

const ESelectDownProps = {
    modelValue: {
      type: Array as PropType<string[] | number[]>,
      default: () => []
    },
    width: String,
    size: {
      type: String as PropType<Size>,
      default: 'md'
    },
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false,
    },

  }
;

export default defineComponent({
  name: 'ESelectDown',
  props: ESelectDownProps,
  emits: ['update:modelValue', 'change', 'blur', 'focus', 'clear', 'input', 'delete'],
  setup(props, {slots, emit}) {
    const prefixCls = getPrefixCls('select-down');

    return () => (
      <div>

      </div>

    );
  },
});
