import type { HTMLAttributes, SetupContext } from 'vue';
import { defineComponent, Transition, reactive } from 'vue';
import './style.scss';
import EIcon from '../../icons';
import classNames from '@/composables/useClassName';

const initDefaultProps = {
  duration: 0,
  message: '',
  type: '',
  messageTitle: '',
  hasTitle: false
};

export interface MessageProps extends HTMLAttributes {
  duration?: number;
  message?: string;
  type?: string;
  messageTitle?: string;
  hasTitle?: boolean;
}

export default defineComponent({
  name: 'EMessage',
  setup (_: MessageProps, { attrs }: SetupContext) {
    const props = attrs as MessageProps;
    const data = reactive<{ show: boolean; timer: NodeJS.Timeout | string | number | null }>({
      show: true,
      timer: null
    });
    const { type, messageTitle, hasTitle, message, duration } = { ...initDefaultProps, ...props };
    const messageClassList = classNames(['base-message', type]);
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
                <EIcon name='loading' />
              </div>
              <div class="content-cell u-full">
                {hasTitle && <span class="message-title">{messageTitle}</span>}
                <p>{message}</p>
                {type !== 'info'
                  && <EIcon name='loading'
                  />}
              </div>
            </div>
          </div>
      </Transition>
        : null
    );
  }
});

