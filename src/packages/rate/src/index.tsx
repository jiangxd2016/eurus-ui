import type { HTMLAttributes, SetupContext } from 'vue';
import { defineComponent } from 'vue';
import './style.scss';
import EIcon from '@/packages/icons';

const initDefaultProps = {
  value: 0,
  max: 5
};

export interface ReteProps extends HTMLAttributes {
  value?: string | number;
  max?: string | number;
}

export default defineComponent({
  name: 'ERate',
  setup (_: ReteProps, { attrs }: SetupContext) {
    const props = attrs as ReteProps;
    const { value, max } = { ...initDefaultProps, ...props };

    const renderRates = () => {
      const arr = [];
      for (let i = 0; i < max; i++) {
        arr.push(i);
      }
      return arr.map((o) => {
        if ((o + 1) > value) {
          return <EIcon name='star'></EIcon>;
        } else {
          return <EIcon name='starFilled'></EIcon>;
        }
      });
    };

    return () => (
      <div class="e-rate">
        {renderRates()}
      </div>
    );
  }
});

