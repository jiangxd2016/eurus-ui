import type { Ref } from 'vue';
import {
  h,
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  ref
} from 'vue';
import { ItemProps } from './props';

export const useResizeChange = (
  props: any,
  rootRef: Ref<HTMLElement | null>,
  emit: any,
) => {
  let resizeObserver: ResizeObserver | null = null;
  const shapeKey = computed(() =>
    props.horizontal ? 'offsetWidth' : 'offsetHeight',
  );

  const getCurrentSize = () => {
    return rootRef.value ? rootRef.value[shapeKey.value] : 0;
  };

  const dispatchSizeChange = () => {
    const { event, uniqueKey, hasInitial } = props;
    emit(event, uniqueKey, getCurrentSize(), hasInitial);
  };

  onMounted(() => {
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        dispatchSizeChange();
      });
      rootRef.value && resizeObserver.observe(rootRef.value);
    }
  });

  onUpdated(() => {
    dispatchSizeChange();
  });

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });
};

export default defineComponent({
  name: 'VirtualListItem',
  props: ItemProps,
  emits: ['itemResize'],
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null);
    useResizeChange(props, rootRef, emit);

    return () => {
      const {
        tag: Tag,
        component: Comp,
        extraProps = {},
        index,
        source,
        scopedSlots = {},
        uniqueKey,
      } = props;
      const mergedProps = {
        ...extraProps,
        source,
        index,
      };

      if (Comp ) {
        const TagElement = Tag || 'div';
        return (
        <TagElement key={uniqueKey} ref={rootRef}>
          {h(Comp, mergedProps, {
            ...scopedSlots
          })}
        </TagElement>
        );
      }
    };
  },
});
