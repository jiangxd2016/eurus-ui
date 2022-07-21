import { defineComponent } from 'vue';
import './style.scss';

const ETreeProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'ETree',
  props: ETreeProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
