import type { PropType } from 'vue';
import { defineComponent, onMounted, onUpdated, onUnmounted } from 'vue';
import type { MessageType } from '@/packages/_utils';
import { getPrefixCls } from '@/packages/_hooks/use-global-config';
import Icon from '@/packages/icons';
export default defineComponent({
  name: 'Notify',

  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'info',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 300,
    },
    resetOnUpdate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('notify');
    let timer = 0;

    const handleClose = () => {
      emit('close');
    };

    onMounted(() => {
      if (props.duration > 0) {
        timer = window.setTimeout(handleClose, props.duration);
      }
    });

    onUpdated(() => {
      if (props.resetOnUpdate) {
        if (timer) {
          window.clearTimeout(timer);
          timer = 0;
        }
        if (props.duration > 0) {
          timer = window.setTimeout(handleClose, props.duration);
        }
      }
    });

    onUnmounted(() => {
      if (timer) {
        window.clearTimeout(timer);
      }
    });
    return () => (
      <li
        role="alert"
        class={[
          prefixCls,
          `${prefixCls}-${props.type}`,
          { [`${prefixCls}-closable`]: props.closable },
        ]}
      >
        <div class={`${prefixCls}-left`}>
          {props.showIcon
            && <div class={`${prefixCls}-icon`}>
              {/* {slots.icon ? slots.icon() : <Icon name={props.type} />} */}
            </div>
          }
        </div>
        <div class={`${prefixCls}-right`}>
          <div class={`${prefixCls}-title`}>
            {slots?.default?.()}
          </div>
          <div class={`${prefixCls}-content`}>
            {slots?.content?.()}
          </div>
          {slots?.footer && <div class={`${prefixCls}-footer`}>
            {slots.footer()}
          </div>}

        </div>
        {
          props.closable && <div class={`${prefixCls}-close`} onClick={handleClose}>
            <Icon name="close" />
          </div>
        }
      </li>
    );
  }
});
