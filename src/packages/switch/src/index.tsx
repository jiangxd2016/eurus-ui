import type { SetupContext } from 'vue';
import { defineComponent } from 'vue';
import './style.scss';

const SwitchProps = {
  disabled: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  }
};

export default defineComponent({
  name: 'ESwitch',
  props: SwitchProps,
  setup (props, { emit }: SetupContext) {
    const handleChange = () => {
      emit('updateModel', props.checked);
    };

    return () => (
      <div class="e-switch">
        <label>
          <input
            class="switch"
            checked={props.checked}
            type="checkbox"
            style="display: none;"
            disabled={props.disabled}
            onChange={handleChange}
          />
          <span
            class="e-switch-body"
          />
        </label>
      </div>
    );
  }
});

