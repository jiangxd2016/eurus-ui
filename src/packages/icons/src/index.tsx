import type { Component, PropType } from 'vue';
import { renderSlot, h, computed, defineComponent } from 'vue';
import * as allIcon from '../icons-vue';
import { isStringNumber } from '@/packages/_utils/is';
import './style.scss';
import { warnOnce } from '@/packages/_utils/warn';
const IconProps = {
  size: [Number, String],
  color: String,
  name: String as PropType<keyof typeof allIcon | string | undefined>,
};

export default defineComponent({
  name: 'EIcon',
  props: IconProps,
  setup(props, { slots }) {
    const mergeStyles = computed(() => {
      return {
        'font-size': isStringNumber(props.size) ? `${props.size}px` : props.size,
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
