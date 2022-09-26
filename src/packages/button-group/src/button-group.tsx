import './button-group.scss';

import { defineComponent } from 'vue';
import { getPrefixCls } from '@/packages/_hooks/use-global-config';
export default defineComponent({
  name: 'RaButtonGroup',
  setup(_, { slots }) {
    const prefixCls = getPrefixCls('button-group');
    return () => (
      <div class={[prefixCls]}>
        {slots?.default && slots.default()}
      </div>
    );
  }
});
