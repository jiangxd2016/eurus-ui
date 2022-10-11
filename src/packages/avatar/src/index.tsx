import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import './style.scss';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

const EAvatarProps = {
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  color: {
    type: String,
    default: '#fff',
  },
  offline: {
    type: Boolean,
    default: false,
  },
  online: {
    type: Boolean,
    default: false,
  },
  notice: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 0,
  }
};

export default defineComponent({
  name: 'EAvatar',
  props: EAvatarProps,
  setup(props, { slots, emit }) {

    return () => (
      <div class={['avatar', props.size, props.offline && 'offline', props.online && 'online', props.notice && 'notice']} >
        {slots.default && slots.default()}
        {(props.offline || props.online) && <div class="dot" />}
        {props.notice && <div class="reddot" date-count={props.count} />}

      </div>

    );
  },
});
