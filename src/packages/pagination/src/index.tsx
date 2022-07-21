import { defineComponent } from 'vue';
import './style.scss';

const EPaginationProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EPagination',
  props: EPaginationProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
