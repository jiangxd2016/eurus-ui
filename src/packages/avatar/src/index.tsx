import { defineComponent } from 'vue';
import './style.scss';

const EAvatarProps = {
  size: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '#fff',
  },
  offline: {
    type: Boolean,
    default: false,
  },
  notice: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EAvatar',
  props: EAvatarProps,
  setup(props, { slots, emit }) {

    return () => (
      <div class={['avatar', props.size, props.offline && 'offline', props.notice && 'notice']} >
        {slots.default && slots.default()}
    </div>

    );
  },
});
