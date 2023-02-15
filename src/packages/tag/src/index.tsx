import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import './style.scss';
import type { Size } from '@/packages/_utils/size';
import { getPrefixCls } from '@/packages/_utils/global-config';
import EIcon from '@/packages/icons';
import size from '@/packages/input/demo/Size.vue';

type tagType = 'default' | 'primary' | 'positive' | 'warning' | 'danger' | 'info';
const ETagProps = {
  type: {
    type: String as PropType<tagType>,
    default: 'default'
  },
  closable: {
    type: Boolean,
    default: false
  },
  color: { default: '' },
  borderColor: { default: '' },
  bgColor: { default: '' },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
};

export default defineComponent({
  name: 'ETag',
  props: ETagProps,
  emits: ['click', 'close'],
  setup(props, { slots, emit }) {

    const prefixCls = getPrefixCls('tag');
    const visible = ref(true);

    const closeClick = (e: Event) => {
      visible.value = false;
      emit('close', e);
    };
    const tagClick = (e: Event) => {
      emit('click', e);
    };

    return () => (
      <span
        role="presentation"
        aira-hidden={!visible.value}
        aira-label="tag"
        class={{
          [prefixCls]: true,
          [`${prefixCls}-${props.type}`]: props.type,
          [`${prefixCls}-${props.size}`]: props.size,
        }}
        style={{
          color: props.color,
          borderColor: props.borderColor,
          backgroundColor: props.bgColor,
          display: visible.value ? 'inline-flex' : 'none'

        }}
        onClick={tagClick.bind(this)}
      >
        {visible.value}
        {slots?.default && slots.default()}
        {props.closable
          && <span onClick={closeClick} aria-hidden="true" class={`${prefixCls}-icon`}>
            <EIcon name="close" size={size.value}></EIcon>
          </span>
        }

      </span>

    );
  },
});
