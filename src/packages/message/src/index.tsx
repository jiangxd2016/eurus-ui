import type { HTMLAttributes, PropType, SetupContext } from 'vue';
import { defineComponent, Transition, reactive } from 'vue';
import './style.scss';
import EIcon from '../../icons';
import classNames from '../../_hooks/useClassName';
import { getPrefixCls } from '@/packages/_utils/global-config';

type MessageType = 'info' | 'success' | 'warning' | 'error';

const MessageTypeIcon = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'misuse'
} as const;

export interface MessagePropsType extends HTMLAttributes {
  duration?: number;
  message?: string;
  type?: MessageType;
  title?: string;
}

export const MessageProps = {
  duration: {
    type: Number as PropType<number>,
    default: 0
  },
  message: {
    type: String as PropType<string>,
    default: ''
  },
  title: {
    type: String as PropType<string>,
    default: ''
  },
  type: {
    type: String as PropType<MessageType>,
    default: 'info'
  },
};

export default defineComponent({
  name: 'EMessage',
  props: MessageProps,
  setup(props, { attrs }: SetupContext) {

    const clsPrefix = getPrefixCls('message');
    const data = reactive<{ show: boolean; timer: NodeJS.Timeout | string | number | null }>({
      show: true,
      timer: null
    });

    const { type, title, message, duration } = { ...props, ...(attrs.props as MessagePropsType) };
    const messageClassList = classNames([clsPrefix, type]);
    const closeMessage = () => {
      data.show = false;
      data.timer = null;
    };
    const startTimer = () => {
      if (duration > 0) {
        data.timer = setTimeout(() => {
          closeMessage();
        }, duration);
      }
    };
    startTimer();
    return () => (
      data.show
        ? <Transition name="EMessage">
          <div class={messageClassList}>
            <div class="e-message-content">
              <div class="content-cell">
                <EIcon name={MessageTypeIcon[type]} />
              </div>
              <div class="content-cell u-full">
                {title && <span class="message-title">{title}</span>}
                <p>{message}</p>
              </div>
            </div>
          </div>
        </Transition>
        : null
    );
  }
});

