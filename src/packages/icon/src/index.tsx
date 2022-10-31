import { defineComponent } from 'vue';
// import type { PropType } from 'vue';
import './style.scss';

const EIconProps = {
  size: [Number, String],
  color: String,
  // name: String as PropType<keyof typeof IconList>
};

export default defineComponent({
  name: 'EIcon',
  props: EIconProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { slots, emit }) {

    return () => (
      <div>

      </div>

    );
  },
});
