import { defineComponent, provide, reactive, ref, toRefs } from 'vue';
import './style.scss';

import SelectDown from '@/packages/select-down';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { selectProviderInjectionKey } from '@/packages/_utils/constants';
import { ESelectDownProps } from '@/packages/select-down/src';

export default defineComponent({
  name: 'ESelect',
  props: ESelectDownProps,
  setup(props, { emit, slots }) {

    const prefixCls = getPrefixCls('select');

    const selectDownRef = ref<typeof SelectDown>();

    const _value = ref(props.modelValue);
    const selectItem = (value: any) => {
      if (props.multiple) {
        if (Array.isArray(_value.value)) {
          if (_value.value.includes(value)) {
            _value.value.splice(_value.value.indexOf(value), 1);
          } else {
            _value.value.push(value);
          }
        } else {
          _value.value = [value];
        }


      } else {
        _value.value = value;

        selectDownRef.value?.setPaneVisible(false);
        selectDownRef.value?.setModelValue(value);

      }
      emit('update:modelValue', _value.value);
    };

    provide(selectProviderInjectionKey, reactive({ ...toRefs(props), selectItem }));

    return () => {

      return <SelectDown class={prefixCls} {...props} ref={selectDownRef}>

        {slots.default && slots.default()}

      </SelectDown>;
    };
  },
});
