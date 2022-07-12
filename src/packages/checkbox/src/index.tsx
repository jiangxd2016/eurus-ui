import type { PropType, SetupContext } from 'vue';
import { defineComponent } from 'vue';
import './style.scss';

const CheckboxProps = {
  checked: {
    type: Boolean as PropType<false>,
    default: false
  },
  defaultChecked: {
    type: Boolean as PropType<false>,
    default: false
  },
  disabled: {
    type: Boolean as PropType<false>,
    default: false
  }
};

export default defineComponent({
  name: 'ECheckbox',
  props: CheckboxProps,
  setup (props, { slots }: SetupContext) {
    const checkeval = () => {
      if (props.checked) {
        return props.checked;
      }
      return false;
    };
    return () => (
      <div class="e-checkbox">
        <input class={[props.disabled ? 'e-checkbox-disable' : '']} disabled={props.disabled} type="checkbox" checked={checkeval()}/>
        <label class={[props.disabled ? 'e-checkbox-disable' : '']}/>
        <div class="slot-text">
          {slots.default && slots.default()}
        </div>
      </div>
    );
  }
});
