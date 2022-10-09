import type { PropType } from 'vue';
import { defineComponent, toRefs } from 'vue';
import classNames from '../../_hooks/use-classname';
import './style.scss';
const LoaderProps = {
  modelValue: {
    type: Boolean as PropType<Boolean>,
    default: false
  },
  text: {
    type: String as PropType<string>,
    default: ''
  },
  size: {
    type: String as PropType<string>,
    default: 'md'
  },
  color: {
    type: String as PropType<string>,
    default: '#A6A6A6'
  },
};

export default defineComponent({
  name: 'ELoading',
  props: LoaderProps,
  setup(props) {
    const { modelValue, text, size, color } = toRefs(props);
    const spanClass = () => {
      return classNames(['loading-text', `${size.value}-text`]);
    };

    const loadingStyle: any = {
      borderTopColor: color.value,
    };
    return () => (
      modelValue.value && <div class="loading flex flex-center">
        <div class="loading-spinner" style={{ ...loadingStyle }} />
        <span class={spanClass()}>{text.value}</span>
      </div>

    );
  }
});
