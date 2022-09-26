import { inject, computed, onMounted, watch, defineComponent } from 'vue';
import { getPrefixCls } from '@/packages/_hooks/use-global-config';
import './style.scss';

export default defineComponent({
  name: 'ERadio',
  props: {
    disabled: { type: Boolean, default: false },
    value: { type: [String, Boolean, Number] },
    modelValue: { type: [String, Boolean, Number], default: null },
    label: null
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    // import { getFormDisabled } from '../util/form';
    const prefixCls = getPrefixCls('radio');

    const disabledOk = computed(() => {
      return false;
      // return getFormDisabled(props.disabled);
    });
    const checked = computed(() => {
      // 存在value时，当v-model=value时为选中状态
      // 不存在value时，当v-model=true时为选中状态
      let bool;
      if (props.value) {
        bool = props.value === props.modelValue;
      } else {
        bool = !!props.modelValue;
      }
      return bool;
    });
    // formItem
    const controlChange: any = inject(`${prefixCls}ControlChange`, '');
    const changeHandler = () => {
      // 点击后只有选中状态
      if (disabledOk.value) {
        return;
      }
      const val = props.value || true;
      emit('change', val);
      emit('update:modelValue', val);
      controlChange && controlChange(val);
    };
    watch(
      () => props.modelValue,
      (v: any) => {
        controlChange && controlChange(v, 'mounted');
      }
    );
    onMounted(() => {
      controlChange && controlChange(props.modelValue, 'mounted');
    });
    return () => (
      <label
        class={{
          disabled: disabledOk.value,
          checked: checked.value,
          [prefixCls]: true,
        }}
        onClick={changeHandler}
      >
        <span>
          <span class="radio-inner" />
          {slots?.default && <span class="radio-text">
            {slots.default()}
          </span>}

          {props.label
            && <span class="radio-text" v-html="label" />
          }
        </span>
      </label>

    );
  },
});
