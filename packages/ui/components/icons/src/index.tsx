import type { Component, PropType } from 'vue';
import { renderSlot, h, computed, defineComponent } from 'vue';
import * as allIcon from '../icons-vue';
import './style.scss';
import { warnOnce } from '@/components/_utils/warn';
import type { Size } from '@/components/_utils/size';
import { getSize } from '@/components/_utils/size';
const IconProps = {
  size: {
    type: [String, Number] as PropType<Size | number>,
    default: 'md',
  },
  color: String,
  name: String as PropType<keyof typeof allIcon | string | undefined>,
};

export default defineComponent({
  name: 'EIcon',
  props: IconProps,
  emits: ['click'],
  setup(props, { slots }) {
    const mergeStyles = computed(() => {
      return {
        'font-size': getSize(props.size),
        'color': props.color,
      };
    });
    let IconElement: Component | null = null;

    if (props.name && Object.keys(allIcon).includes(props.name)) {
      IconElement = h(allIcon[props.name as keyof typeof allIcon], {
        style: mergeStyles.value
      });
      // support iconfont
    } else if (!slots.default && props.name) {
      IconElement = h('i', {
        class: props.name,
        style: mergeStyles.value
      });
    }
    if (!IconElement && !slots.default) {
      warnOnce('icon', `not found ${props.name} , please check you enter`);

    }
    return () => IconElement ? IconElement : renderSlot(slots, 'default');

  },
});
