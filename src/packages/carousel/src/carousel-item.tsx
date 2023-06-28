import { defineComponent, getCurrentInstance, inject, reactive, ref, watchEffect } from 'vue';
import { CarouselKey, getPrefixCls } from '@/packages/_utils';

export const CarouselItemConfig = {
  horizontal: {
    translate: 'translateX',
    offset: 'offsetWidth',
  },
  vertical: {
    translate: 'translateY',
    offset: 'offsetHeight',
  },
} as const;

export default defineComponent({
  name: 'EuCarouselItem',
  props: {
    raName: {
      type: String,
      default: '',
    },
    raLabel: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('carousel-item');
    const instance = getCurrentInstance();
    const itemStyle = ref<string>('');
    const carouselProvide = inject(CarouselKey);
    const data = reactive<{
      active: boolean;
      animating: boolean;
    }>({ active: false, animating: false });
    let direction: 'horizontal' | 'vertical' = 'horizontal';

    watchEffect(() => {
      direction = carouselProvide?.offsetWidth.value ? 'horizontal' : 'vertical';
    });

    // fun
    function transformItem(index: number, activeIndex: number, isAnimate = true) {
      if (isAnimate) {
        isAnimating(index, activeIndex, carouselProvide?.itemReact.length || 0);
      }
      index = processIndex(index, activeIndex, carouselProvide?.itemReact.length || 0);
      calcTransform(index, activeIndex);
    }

    function calcTransform(index: number, activeIndex: number) {
      const offset = CarouselItemConfig[direction].offset;
      itemStyle.value = `${CarouselItemConfig[direction].translate}(${(index - activeIndex) * (carouselProvide ? carouselProvide[offset].value : 0)}px)`;
    }

    function addCarouseItem() {
      carouselProvide?.itemReact.push({
        transformItem,
        uid: instance!.uid,
      });
    }

    function processIndex(index: number, activeIndex: number, length: number) {
      if (!carouselProvide?.isLoop.value) {
        return index;
      }
      if (activeIndex === length - 1 && index === 0) {
        index = length;
      } else if (activeIndex === 0 && index === length - 1) {
        index = -1;
      }
      return index;
    }

    // difficult to resolve
    function isAnimating(index: number, activeIndex: number, length: number) {
      data.animating = false;
      if (!carouselProvide?.isLoop.value) {
        data.animating = true;
        return;
      }
      if (index === activeIndex || index === carouselProvide?.oldActiveIndex.value) {
        data.animating = true;
      }

      if (
        (activeIndex === 0 && carouselProvide?.oldActiveIndex.value === length - 1) ||
        (activeIndex === length - 1 && carouselProvide?.oldActiveIndex.value === 0)
      ) {
        return;
      }

      if (activeIndex > carouselProvide?.oldActiveIndex.value) {
        if (index <= activeIndex && index >= carouselProvide?.oldActiveIndex.value) {
          data.animating = true;
        }
      } else if (activeIndex < carouselProvide?.oldActiveIndex.value && index >= activeIndex && index <= carouselProvide?.oldActiveIndex.value) {
        data.animating = true;
      }
    }

    addCarouseItem();
    return () => (
      <div style={{ transform: itemStyle.value }} class={[prefixCls, data.animating && 'is-animating']}>
        {slots.default?.()}
      </div>
    );
  },
});
