import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import './style.scss';

export const EFormProps = {
  model: {
    type: Object,
    default: () => ({}),
  },
  // 行内表单
  inline: {
    type: Boolean,
    default: false,
  },
  // 是否是禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // label 宽度
  labelWidth: {
    type: String,
    default: '120px',
  },
  // label 位置 left center right
  labelAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
};

export default defineComponent({
  name: 'EForm',
  props: EFormProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
