import type { PropType, SetupContext } from 'vue';
import { defineComponent } from 'vue';
import './style.scss';

const CheckboxProps = {
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  defaultChecked: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

export default defineComponent({
  name: 'ECheckbox',
  props: CheckboxProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }: SetupContext) {

    const updateValue = () => {
      emit('change', !props.modelValue);
      emit('update:modelValue', !props.modelValue);
    };
    return () => (
      <div class="e-checkbox" onClick={updateValue}>
        <input class={[props.disabled ? 'e-checkbox-disable' : '']} disabled={props.disabled} type="checkbox" checked={props.modelValue} />
        <label class={[props.disabled ? 'e-checkbox-disable' : '']} />
        <div class="slot-text">
          {slots.default && slots.default()}
        </div>
      </div>
    );
  }
});
