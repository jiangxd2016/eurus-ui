import { defineComponent } from 'vue';
import './style.scss';

import SelectDown from '@/packages/select-down';
import { getPrefixCls } from '@/packages/_utils/global-config';

const ESelectProps = {
  type: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'ESelect',
  props: ESelectProps,
  setup(props, { slots }) {

    const prefixCls = getPrefixCls('select');
    return () => {

      return <div class={prefixCls}>
        <SelectDown>

          {slots.default && slots.default()}

        </SelectDown>
      </div>;
    };
  },
});
