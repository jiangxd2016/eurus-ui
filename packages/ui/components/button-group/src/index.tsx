import type { PropType } from 'vue';
import { defineComponent, provide } from 'vue';
import './style.scss';
import { getPrefixCls } from '@/components/_utils/global-config';
import { buttonGroupProviderTypeInjectionKey } from '@/components/_utils/constants';
import type { Size } from '@/components/_utils/size';

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

    provide(buttonGroupProviderTypeInjectionKey, props);
    return () => (
      <div class={[prefixCls, props.vertical && 'vertical']}>
        {slots?.default && slots.default()}
      </div>

    );
  }
});
