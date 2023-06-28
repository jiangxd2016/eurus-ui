import type { CSSProperties, PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import type { Size } from '@/packages/_utils/size';
import './style.scss';
import { flatten } from '@/packages/_utils/flatten';
import { isNumber } from '@/packages/_utils/is';
import { getPrefixCls } from '@/packages/_utils/global-config';

const ESpaceProps = {
  align: {
    type: String as PropType<'start' | 'end' | 'center' | 'baseline'>,
    default: 'start',
  },
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
  size: {
    type: [Number, String] as PropType<Size | number>,
    default: 'md',
  },
  wrap: {
    type: Boolean,
    default: false,
  },
  fill: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'ESpace',
  props: ESpaceProps,
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('space');

    const mergedAlign = computed(() => props.align ?? (props.direction === 'horizontal' ? 'center' : ''));

    const computedCls = computed(() => {
      return {
        [`${prefixCls}`]: true,
        [`${prefixCls}-${props.direction}`]: props.direction,
        [`${prefixCls}-align-${mergedAlign.value}`]: mergedAlign.value,
        [`${prefixCls}-wrap`]: props.wrap,
        [`${prefixCls}-fill`]: props.fill,
      };
    });

    function getMargin(size: Size | number) {
      if (isNumber(size)) {
        return size;
      }
      switch (size) {
        case 'xs':
          return 4;
        case 'sm':
          return 8;
        case 'md':
          return 16;
        case 'lg':
          return 24;
        case 'xl':
          return 32;
        default:
          return 8;
      }
    }

    const getMarginStyle = (index: number, isLast: boolean): CSSProperties => {
      const style: CSSProperties = {};

      const marginWidth = `${getMargin(props.size)}px`;

      if (isLast) {
        return props.wrap ? { marginBottom: marginWidth } : {};
      }

      if (props.direction === 'horizontal') {
        style.marginRight = marginWidth;
      }
      if (props.direction === 'vertical' || props.wrap) {
        style.marginBottom = marginWidth;
      }

      return style;
    };

    return () => {
      const children = flatten(slots.default?.() || []);

      return (
        <div class={computedCls.value}>
          {children.map((child, index) => {
            return (
              <div key={child.key ?? `item-${index}`} class={`${prefixCls}-item`} style={getMarginStyle(index, index === children.length - 1)}>
                {child}
              </div>
            );
          })}
        </div>
      );
    };
  },
});
