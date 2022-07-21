import type { HTMLAttributes, SetupContext, VNode } from 'vue';
import { defineComponent } from 'vue';
import './style.scss';
import NStep from './stepItem';
import classNames from '@/composables/useClassName';

export interface StepsProps extends HTMLAttributes {
  vertical?: boolean;
  active?: number;
}

export default defineComponent({
  name: 'NStep',
  setup(_: StepsProps, { slots, attrs }: SetupContext) {
    const { vertical, active = 1 } = attrs as StepsProps;
    const renderChild = (child: VNode, index: number) => {
      const setpProps = {
        ...child.props,
        index,
        vertical,
        active: index === active - 1,
        isLatest: slots.default ? index === slots.default().length - 1 : true
      };
      return (
        <NStep {...setpProps} />
      );
    };

    const stepsClass = () => {
      const classList = ['e-steps', vertical ? 'vertical' : 'horizontal'];
      return classNames(classList);
    };

    return () => (
      <div class={stepsClass()}>
        {slots?.default ? slots.default().map((child, index) => {
          return renderChild(child, index);
        }) : ''}
      </div>
    );
  }
});

