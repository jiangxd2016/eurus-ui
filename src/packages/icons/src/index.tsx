import type { PropType } from 'vue';
import { renderSlot, h, computed, defineComponent } from 'vue';

import IconList from './iconList';
import { useSize } from '@/packages/_shared/useSize';

const IconProps = {
  size: [Number, String],
  color: String,
  name: String as PropType<keyof typeof IconList>
};

export default defineComponent({
  name: 'Icon',
  props: IconProps,
  setup(props, { slots }) {
    const mergeStyles = computed(() => {
      return {
        fontSize: useSize(props.size) || '24px',
        color: props.color,
        display: 'flex'
      };
    });
    let element: string | null = null;

    if (props.name && Object.keys(IconList).includes(props.name)) {
      element = IconList[props.name];
      // support iconfont
    } else if (!element && !slots.default) {
      element = `<i class=${'iconfont' + props.name} />`;
    }

    return () => h('div', {
      style: mergeStyles.value,
      innerHTML: element
    }, [slots.default && renderSlot(slots, 'icon-slot')]);
  },
});
