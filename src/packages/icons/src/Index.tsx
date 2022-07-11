import type { PropType } from 'vue';
import { h, computed, defineComponent } from 'vue';

import IconList from './iconList';

const IconProps = {
  size: Number,
  color: String,
  name: String as PropType<keyof typeof IconList>
};

export default defineComponent({
  name: 'Icon',
  props: IconProps,
  setup(props) {
    const mergeStyles = computed(() => {
      return {
        fontSize: props.size,
        color: props.color
      };
    });
    let svgElement: string | null = null;
    if (props.name && Object.keys(IconList).includes(props.name)) {

      svgElement = IconList[props.name].svg;

    }

    return () => h('div', {
      style: { ...mergeStyles.value },
      domProps: { innerHTML: svgElement }
    });

  },
});
