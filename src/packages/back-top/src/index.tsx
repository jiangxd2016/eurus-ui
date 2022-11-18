import type { PropType } from 'vue';
import { defineComponent, onBeforeUnmount, onMounted, ref, Teleport, Transition } from 'vue';
import './style.scss';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { scrollTop } from '@/packages/_utils/dom';
const EBackTopProps = {
  text: {
    type: String,
    default: '返回顶部',
  },
  behavior: {
    type: String as PropType<ScrollBehavior>,
    default: 'smooth',
  },
  height: { default: 200 },
  bottom: { default: 30 },
  right: { default: 30 }
};

export default defineComponent({
  name: 'EBackTop',
  props: EBackTopProps,
  emits: ['click'],
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('back-top');
    const backTop = ref<HTMLElement>();
    const backTopVisible = ref(false);
    const windowScroll = () => {
      backTopVisible.value = scrollTop() > props.height;
    };

    const backTopClick = () => {

      const currentScroll = scrollTop();
      if (currentScroll > 0) {
        window.scrollTo({ left: 0, top: 0, behavior: props.behavior });
      }

      emit('click');
    };

    onMounted(() => {
      window.addEventListener('scroll', windowScroll);

    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', windowScroll);
    });

    return () => (
      <Teleport to="body">
        <div class={[prefixCls]} ref={backTop} role="button" aria-hidden='true' onClick={backTopClick} style={{
          right: props.right + 'px',
          bottom: props.bottom + 'px',
          visibility: backTopVisible.value ? 'visible' : 'hidden'
        }}>
          <Transition
            name="fade-in-scale-up-transition"
          >
          {
            slots?.default ? slots.default() : <span class={[prefixCls + '-text']} v-text={props.text}></span>
          }
          </Transition>
        </div>
      </Teleport>

    );
  },
});
