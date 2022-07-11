import type { PropType } from 'vue';
import { renderSlot, h, computed, defineComponent } from 'vue';

import IconList from './iconList';
import { useSize } from '@/use/useSize';

const IconProps = {
  size: Number,
  color: String,
  name: String as PropType<keyof typeof IconList>
};

export default defineComponent({
  name: 'Icon',
  props: IconProps,
  setup(props, { slots }) {
    const mergeStyles = computed(() => {
      return {
        fontSize: useSize(props.size),
        color: props.color
      };
    });
    let element: string | null = null;

    if (props.name && Object.keys(IconList).includes(props.name)) {
      element = IconList[props.name].svg;
    }

    // support iconfont
    if (!element && !slots.default) {
      element = `<i class=${'iconfont' + props.name} />`;
    }

    return () => h('div', {
      style: mergeStyles.value,
      innerHTML: element
    }, [slots.default && renderSlot(slots, 'icon-slot')]);
  },
});
