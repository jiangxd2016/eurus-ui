import type { PropType } from 'vue';
import { computed, defineComponent, h } from 'vue';
import iconList from './iconList';

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

      svgElement = iconList[props.name].svg;

    }

    return () => <div style={mergeStyles.value} dangerouslySetInnerHTML={svgElement}>
    </div>;

  },
});
