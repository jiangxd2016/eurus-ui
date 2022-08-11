<template>
  <div class="ra-carousel__carousel-item" :style="{ transform: itemStyle }" :class="{ 'is-animating': data.animating }">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  inject,
  reactive,
  ref,
  watchEffect,
} from 'vue';
import type {
  ICarouselItemProps,
  ICarouselProvide
} from './carousel';
import {
  CAROUSEL_ITEM_PROVIDE_TOKEN,
  CarouselItemConfig
} from './carousel';

export default defineComponent({
  name: 'RaCarouselItem',
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
  setup(props: ICarouselItemProps) {
    const instance = getCurrentInstance();
    const itemStyle = ref<string>('');
    const CAROUSEL_PROVIDE: ICarouselProvide = inject<ICarouselProvide>(
      CAROUSEL_ITEM_PROVIDE_TOKEN, {} as ICarouselProvide
    );
    const data = reactive<{
      active: boolean;
      animating: boolean;
    }>({ active: false, animating: false });
    let direction: 'horizontal' | 'vertical' = 'horizontal';

    watchEffect(() => {
      direction = CAROUSEL_PROVIDE.offsetWidth.value
        ? 'horizontal'
        : 'vertical';
    });

    // fun
    function transformItem(
      index: number,
      activeIndex: number,
      isAnimate = true,
    ) {
      if (isAnimate) { isAnimating(index, activeIndex, CAROUSEL_PROVIDE.itemReact.length); }
      index = processIndex(
        index,
        activeIndex,
        CAROUSEL_PROVIDE.itemReact.length,
      );
      calcTransform(index, activeIndex);
    }

    function calcTransform(index: number, activeIndex: number) {
      itemStyle.value = `${CarouselItemConfig[direction].translate}(${(index
        - activeIndex)
        * CAROUSEL_PROVIDE[CarouselItemConfig[direction].offset].value}px)`;
    }

    function addCarouseItem() {
      CAROUSEL_PROVIDE.itemReact.push({
        transformItem,
        uid: instance.uid,
      });
    }

    function processIndex(index: number, activeIndex: number, length: number) {
      if (!CAROUSEL_PROVIDE.isLoop.value) {
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
      if (!CAROUSEL_PROVIDE.isLoop.value) {
        data.animating = true;
        return;
      }
      if (
        index === activeIndex
        || index === CAROUSEL_PROVIDE.oldActiveIndex.value
      ) {
        data.animating = true;
      }

      if (
        (activeIndex === 0
          && CAROUSEL_PROVIDE.oldActiveIndex.value === length - 1)
        || (activeIndex === length - 1
          && CAROUSEL_PROVIDE.oldActiveIndex.value === 0)
      ) {
        return;
      }

      if (activeIndex > CAROUSEL_PROVIDE.oldActiveIndex.value) {
        if (
          index <= activeIndex
          && index >= CAROUSEL_PROVIDE.oldActiveIndex.value
        ) {
          data.animating = true;
        }
      } else if (activeIndex < CAROUSEL_PROVIDE.oldActiveIndex.value
        && index >= activeIndex
        && index <= CAROUSEL_PROVIDE.oldActiveIndex.value
      ) {
        data.animating = true;
      }
    }

    addCarouseItem();
    return { props, itemStyle, data };
  },
});
</script>

<style src="./carousel-item.scss">
</style>
