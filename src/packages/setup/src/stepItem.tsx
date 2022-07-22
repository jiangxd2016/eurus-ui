import { defineComponent } from 'vue';
import classNames from '@/hooks/useClassName';

interface stepProps {
  title?: string;
  description?: string;
  index?: number;
  vertical?: boolean;
  isLatest?: boolean;
  active?: boolean;
}

export default defineComponent({
  name: 'EStepItem',
  setup (_: stepProps, { slots, attrs }) {
    const { active, vertical, index, isLatest, title, description } = attrs as stepProps;

    const nStepClass = () => {
      const classList = ['e-step', active ? 'active' : '', vertical ? '' : 'e-step-center'];
      return classNames(classList);
    };

    const iconClass = () => {
      const classList = ['icon', active ? 'active' : ''];
      return classNames(classList);
    };

    return () => (
      <div class={nStepClass()}>
        <div>
          <div class={iconClass()}>{(index || 0) + 1}</div>
          { !isLatest && vertical && <div class="vertical-line" /> }
        </div>
        <div class="content">
          <div class="title">{title}</div>
          <div class="description">{description}</div>
        </div>
        { !isLatest && !vertical && <div class="line" /> }
        {slots.default && slots.default()}
      </div>
    );
  }
});

