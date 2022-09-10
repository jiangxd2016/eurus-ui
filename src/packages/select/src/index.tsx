import { defineComponent } from 'vue';
import './style.scss';

const ESelectProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'ESelect',
  props: ESelectProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
