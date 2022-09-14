import { defineComponent, ref } from 'vue';
import Radio from '..';
import { getPrefixCls } from '@/packages/_utils/global-config';

export default defineComponent({
  name: 'ERadioGroup',
  props: {
    modelValue: null,
    options: { type: Array, default: () => [] },
    optionsKey: { default: () => ({ label: 'label', value: 'value' }) },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {

    const prefixCls = getPrefixCls('radio-group');

    const groupValue = ref(props.modelValue);
    const change = (val: [string | number], item: any) => {
      emit('update:modelValue', val);
      emit('change', val, item);
    };

    return () => (
      <div class={prefixCls}>
        {
          props.options.map((item: any, index) => {
            return <Radio
              key={index}
              v-model={groupValue.value}
              value={item[props.optionsKey.value]}
              disabled={props.disabled || item.disabled}
              onChange={(e: [string | number]) => change(e, item)}
            >
              {item[props.optionsKey.label]}
            </Radio>;
          })

        }
      </div>
    );
  }
});
