import type { PropType } from 'vue';
import { shallowRef, defineComponent, onBeforeUnmount, onMounted, ref, Transition } from 'vue';
import './style.scss';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { scrollTop } from '@/packages/_utils/dom';
import { easeInOutCubic } from '@/packages/_utils/animation';
const EBackTopProps = {
  text: {
    type: String,
    default: '返回顶部',
  },
  to: {
    type: [String, Object] as PropType<HTMLElement | string>,
    default: 'body'
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

    const container = shallowRef<HTMLElement>();

    const backTop = ref<HTMLElement>();
    const backTopVisible = ref(false);
    const windowScroll = () => {
      backTopVisible.value = scrollTop(container.value) > props.height;
    };
    const scrollToTop = () => {

      if (!container.value) { return; }
      const beginTime = Date.now();
      const beginValue = container.value.scrollTop;
      const frameFunc = () => {
        if (!container.value) { return; }
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          container.value.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          requestAnimationFrame(frameFunc);
        } else {
          container.value.scrollTop = 0;
        }
      };
      requestAnimationFrame(frameFunc);
    };
    const backTopClick = () => {

      const currentScroll = scrollTop(container.value);
      if (currentScroll > 0) {
        scrollToTop();
      }

      emit('click');
    };

    onMounted(() => {

      const { to } = props;
      container.value = typeof to === 'string' ? document.querySelector(to) as HTMLElement | undefined : to;
      container.value?.addEventListener('scroll', windowScroll);

    });

    onBeforeUnmount(() => {
      container.value?.removeEventListener('scroll', windowScroll);
    });

    return () => (
      <Transition name="fade-in">
        <div class={[prefixCls]} ref={backTop} role="button" aria-hidden='true' onClick={backTopClick} style={{
          right: props.right + 'px',
          bottom: props.bottom + 'px',
          visibility: backTopVisible.value ? 'visible' : 'hidden'
        }}>

          {
            slots?.default ? slots.default() : <span class={[prefixCls + '-text']} v-text={props.text}></span>
          }
        </div>
      </Transition>

    );
  },
});
