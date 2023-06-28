import type { PropType } from 'vue';
import { defineComponent, provide } from 'vue';
import './style.scss';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { buttonGroupKey } from '@/packages/_utils/constants';
import type { Size } from '@/packages/_utils/size';

const EButtonGroupProps = {
  vertical: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
};

export default defineComponent({
  name: 'EButtonGroup',
  props: EButtonGroupProps,
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('button-group');

    provide(buttonGroupKey, props);
    return () => <div class={[prefixCls, props.vertical && 'vertical']}>{slots?.default && slots.default()}</div>;
  },
});
