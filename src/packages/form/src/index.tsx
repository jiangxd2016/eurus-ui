import { defineComponent } from 'vue';
import './style.scss';

const EFormProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EForm',
  props: EFormProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
