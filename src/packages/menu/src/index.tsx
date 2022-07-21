import { defineComponent } from 'vue';
import './style.scss';

const EMenuProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EMenu',
  props: EMenuProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
