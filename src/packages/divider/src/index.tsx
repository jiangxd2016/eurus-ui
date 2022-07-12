import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import './style.scss';

const dividerProps = {
  dashed: {
    type: Boolean as PropType<true>,
    default: false
  },
  vertical: {
    type: String as PropType<string>,
    default: 'vertical'
  },
  size: {
    type: String as PropType<string>,
    default: 'md'
  },
  color: {
    type: String as PropType<string>,
    default: '#A6A6A6'
  }
};

export default defineComponent({
  name: 'EDivider',
  props: dividerProps,
  setup(props) {

    return () => (
      <span class="loadding">

      </span>
    );
  }
});
