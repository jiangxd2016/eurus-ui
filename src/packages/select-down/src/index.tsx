import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import './style.scss';
import type { Size } from '@/packages/_utils/size';
import { getPrefixCls } from '@/packages/_utils/global-config';
import EuInput from '@/packages/input';
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

    // const computedDisabled = computed(() => {
    //   return props.disabled;
    // });

    const computedCls = computed(() => {
      return {
        [prefixCls]: true,
        [`${prefixCls}-${props.size}`]: props.size,
      };
    });


    return () => (
      <div class={computedCls.value}>
        <div class={`${prefixCls}-control`}>
          <EuInput></EuInput>
        </div>
        <div class={`${prefixCls}-dropdown`}>
          <div class={`${prefixCls}-dropdown-content`}>
            {slots.default?.()}
          </div>
        </div>
      </div>

    );
  },
});
