import { defineComponent } from 'vue';
import './style.scss';

const ECarouselProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'ECarousel',
  props: ECarouselProps,
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
