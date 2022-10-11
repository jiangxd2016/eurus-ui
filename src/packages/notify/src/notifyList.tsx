import type { PropType } from 'vue';
import { defineComponent, TransitionGroup } from 'vue';
import type {
  NotifyItem,
  NotifyPosition
} from './types';
import {
  NOTIFICATION_POSITION
} from './types';
import Notify from './notify';
import usePopupManager from '@/packages/_hooks/use-popup-manager';
import { toKebabCase } from '@/packages/_utils/convert-case';
import { getPrefixCls } from '@/packages/_hooks/use-global-config';
import { getSlotFunction } from '@/packages/_utils/vue-utils';
export default defineComponent({
  name: 'NotifyList',
  props: {
    notifications: {
      type: Array as PropType<NotifyItem[]>,
      default: () => [],
    },
    position: {
      type: String as PropType<NotifyPosition>,
      default: 'topRight',
      validator: (value: any) => {
        return NOTIFICATION_POSITION.includes(value);
      },
    },
  },
  emits: ['close', 'afterClose'],
  setup(props, context) {
    const prefixCls = getPrefixCls('notify-list');
    const kebabPosition = toKebabCase(props.position);
    const { zIndex } = usePopupManager('message', { runOnMounted: true });

    const isRight = props.position.includes('Right');

    return () => (
      <div class={`${prefixCls} ${prefixCls}-${kebabPosition}`} style={{ zIndex: zIndex.value }}>

        <TransitionGroup

          name={`slide-${isRight ? 'right' : 'left'}-notify`}
          onAfterLeave={() => context.emit('afterClose')}
          tag="ul"
        >
          {props.notifications.map((item) => {
            const slots = {
              default: getSlotFunction(item.title),
              content: getSlotFunction(item.content),
              icon: getSlotFunction(item.icon),
              footer: getSlotFunction(item.footer),
            };
            return (
              <Notify
                key={item.id}
                type={item.type}
                duration={item.duration}
                closable={item.closable}
                v-slots={slots}
                onClose={() => context.emit('close', item.id)}
              />
            );
          })}
        </TransitionGroup>
      </div>

    );
  },
});
