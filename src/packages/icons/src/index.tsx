import type { Component, PropType } from 'vue';
import { renderSlot, h, computed, defineComponent } from 'vue';
import * as allIcon from 'eurus-icons-vue';
import './style.scss';
import { warnOnce } from '@/packages/_utils/warn';
import type { Size } from '@/packages/_utils/size';
import { getSize } from '@/packages/_utils/size';
import { getPrefixCls } from '@/packages/_utils/global-config';
import type { StringNumber } from '@/packages/_utils/types';
import { toPascalCase } from '@/packages/_utils';

type allIconKeyType = keyof typeof allIcon;
const IconProps = {
  size: {
    type: [String, Number] as PropType<Size | number | StringNumber>,
    default: 'md',
  },
  color: String,
  name: String as PropType<allIconKeyType | string | undefined>,
};

export default defineComponent({
  name: 'EIcon',
  props: IconProps,
  emits: ['click'],
  setup(props, { slots, emit }) {

    const prefixCls = getPrefixCls('icon');

    const mergeStyles = computed(() => {
      return {
        'font-size': getSize(props.size),
        'color': props.color,
      };
    });
    let IconElement: Component | null = null;

    const iconName = toPascalCase(props.name || '');

    if (props.name && Object.keys(allIcon).includes(iconName)) {
      // eslint-disable-next-line import/namespace
      IconElement = h(allIcon[toPascalCase(iconName) as allIconKeyType]);
      // support iconfont
    } else if (!slots.default && props.name) {
      IconElement = h('i', { class: props.name, style: mergeStyles.value });
    }
    if (!IconElement && !slots.default) {
      warnOnce('icon', `not found ${props.name} , please check you enter`);

    }

    const handleClick = (e: Event) => {
      emit('click', e);
    };
    return () => <span class={prefixCls} role="link" tabindex={0} style={mergeStyles.value}
                       onClick={handleClick.bind(this)}
    >
      {IconElement ? IconElement : renderSlot(slots, 'default')}
    </span>;
  },
});
