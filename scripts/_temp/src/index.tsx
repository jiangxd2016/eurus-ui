import type { ButtonHTMLAttributes, PropType } from 'vue';
import { renderSlot, defineComponent, reactive } from 'vue';
import './style.scss';

const BtnProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EButton',
  props: BtnProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
