import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import './style.scss';
import type { Size } from '@/components/_utils/size';
import { getPrefixCls } from '@/components/_utils/global-config';

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
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('select-down');

    const computedCls = computed(() => {
      return {
        [prefixCls]: true,
        [`${prefixCls}-${props.size}`]: props.size,
      };
    });

    const computedDisabled = computed(() => {
      return props.disabled;
    });

    return () => (
      <div class={computedCls.value}>
        {
          computedDisabled.value && (
            slots.default?.()
          )
        }
      </div>

    );
  },
});
