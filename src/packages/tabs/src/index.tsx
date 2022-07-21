import { defineComponent } from 'vue';
import './style.scss';

const ETabsProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'ETabs',
  props: ETabsProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
