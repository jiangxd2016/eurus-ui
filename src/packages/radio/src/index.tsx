import { defineComponent } from 'vue';
import './style.scss';

const ERadioProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'ERadio',
  props: ERadioProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
