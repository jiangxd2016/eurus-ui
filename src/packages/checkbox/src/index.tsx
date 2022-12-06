import { defineComponent } from 'vue';
import './style.scss';
import { getPrefixCls } from '@/packages/_utils/global-config';

const ECheckboxProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  defaultChecked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
};

export default defineComponent({
  name: 'ECheckbox',
  props: ECheckboxProps,
  setup(props, { slots, emit }) {

    const prefixCls = getPrefixCls('checkbox');
    const updateValue = () => {
      emit('change', !props.modelValue);
      emit('update:modelValue', !props.modelValue);
    };
    return () => (
						<div class={[prefixCls]} aria-hidden="true" onClick={updateValue}>
								<label class={[props.disabled ? 'e-checkbox-disable' : '']}>
										<input class={[props.disabled ? 'e-checkbox-disable' : '']} disabled={props.disabled} type="checkbox" checked={props.modelValue}/>
										<div class="slot-text">
												{slots.default && slots.default()}
										</div>
								</label>
						</div>
    );
  },
});
