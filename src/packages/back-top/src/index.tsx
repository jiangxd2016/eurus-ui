import type { PropType } from 'vue';
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref, Teleport } from 'vue';
import { scrollTop } from '@/packages/_utils/dom';
import './style.scss';
import { getPrefixCls } from '@/packages/_hooks/use-global-config';
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
    const element = ref();
    const elClick = () => {

      const currentScroll = scrollTop();
      if (currentScroll > 0) {
        window.scrollTo({ left: 0, top: 0, behavior: props.behavior });
      }

      emit('click');
    };

    const windowScroll = () => {
      show.value = scrollTop() > props.height;
    };
    onMounted(() => {
      nextTick(() => {
        window.addEventListener('scroll', windowScroll);
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', windowScroll);
      if (element.value && element.value.parentNode) {
        element.value.remove();
      }
    });

    return () => (
      <Teleport to="body">
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
</Teleport>
    );
  },
});
