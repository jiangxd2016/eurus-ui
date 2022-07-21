import { defineComponent } from 'vue';
import './style.scss';

const ETableProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'ETable',
  props: ETableProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
