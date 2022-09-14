import type { PropType } from 'vue';
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { scrollTop } from '@/packages/_utils/dom';
import './style.scss';
import { getPrefixCls } from '@/packages/_utils/global-config';
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

    const show = ref(false);
    // const element = ref<HTMLInputElement>()
    const element = ref();
    let stop: any = null;
    const elClick = () => {
      smoothscroll();
      function smoothscroll() {
        const currentScroll = scrollTop();
        if (currentScroll > 0) {
          stop = window.requestAnimationFrame(smoothscroll);
          window.scrollTo({ left: 0, top: 0, behavior: props.behavior });
        }
      }

      emit('click');
    };
    const documentClick = () => {
      stop && window.cancelAnimationFrame(stop); // 可以取消该次动画
    };
    const windowScroll = () => {
      show.value = scrollTop() > props.height;
    };
    onMounted(() => {
      nextTick(() => {
        document.body.append(element.value);
        window.addEventListener('scroll', windowScroll);
        document.addEventListener('click', documentClick);
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', windowScroll);
      document.removeEventListener('click', documentClick);
      if (element.value && element.value.parentNode) {
        element.value.remove();
      }
    });

    return () => (
      <div ref={element} class={[prefixCls]} onClick={elClick} style={{
        right: props.right + 'px',
        bottom: props.bottom + 'px',
        opacity: show.value ? 1 : 0,
        visibility: show.value ? 'visible' : 'hidden'
      }}>
        {
          slots?.default ? slots.default() : <a href="javascript:;" class="icon-top" v-text={props.text}></a>
        }
      </div>

    );
  },
});
