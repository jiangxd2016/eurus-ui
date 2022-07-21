import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import './style.scss';

const dividerProps = {
  dashed: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  direction: {
    type: String as PropType<string>,
    default: 'vertical'
  },
  size: {
    type: String as PropType<string>,
    default: 'md'
  },
  color: {
    type: String as PropType<string>,
    default: '#A6A6A6'
  },
  /**
     * @zh 分割线文字的位置
     * @en The position of the dividing line text
     */
  orientation: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
};

export default defineComponent({
  name: 'EDivider',
  props: dividerProps,
  setup(props, { emit, slots }) {

    return () => {
      const children = slots.default?.();
      const classNames = [
        `e-divider-${props.direction}`,
        {
          ['e-divider-with-text']: children,
        },
      ];

      return (
        <div role="separator" class={classNames}>
          {children && props.direction === 'horizontal' && (
            <span
              class={[
                'e-divider-text',
                `e-divider-text-${props.orientation}`,
              ]}
            >
              {children}
            </span>
          )}
        </div>
      );
    };
  }
});
