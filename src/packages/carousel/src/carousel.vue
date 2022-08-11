<template>
  <div
    ref="root" class="ra-carousel" :style="{ height: raHeight }" @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <transition name="carousel-arrow-left">
      <button
        v-if="raDirection === 'horizontal' && data.hover" class="ra-carousel__arrow ra-carousel__arrow--left"
        @click.stop="thottledArrowClick('left')"
      >
        <i class="ra-icon-arrow-left" />
      </button>
    </transition>

    <transition name="carousel-arrow-right">
      <button
        v-if="raDirection === 'horizontal' && data.hover" class="ra-carousel__arrow ra-carousel__arrow--right"
        @click.stop="thottledArrowClick('right')"
      >
        <i class="ra-icon-arrow-right" />
      </button>
    </transition>
    <slot />
    <div
      class="ra-carousel__indicator" :class="[
        raDirection === 'horizontal'
          ? 'ra-carousel__indicator--horizontal'
          : raDirection === 'vertical'
            ? 'ra-carousel__indicator--vertical'
            : '',
      ]"
    >
      <div
        v-for="(item, index) in data.itemReactLength" :key="index" class="ra-carousel__item"
        @click="indicatorClick(index)"
      >
        <button
          class="ra-carousel__button" :class="{
            'is-active': index === activeIndex,
            'ra-carousel__button--horizontal': raDirection === 'horizontal',
            'ra-carousel__button--vertical': raDirection === 'vertical',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { throttle } from '@estjs/tools';
import {
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import type {
  ICarouselItem,
  ICarouselProvide,
  TCarouselProps,
  TClickType
} from './carousel';
import {
  CAROUSEL_ITEM_PROVIDE_TOKEN
} from './carousel';
export default defineComponent({
  name: 'RaCarousel',
  props: {
    raHeight: {
      type: String,
      default: '',
    },
    raInitialIndex: {
      type: Number,
      default: 0,
    },
    raAutoplay: {
      type: Boolean,
      default: false,
    },
    raInterval: {
      type: Number,
      default: 1000,
    },
    // raArrow: {
    //   type: String,
    //   default: 'always',
    // },
    // raType: {
    //   type: String,
    //   default: undefined,
    // },
    raLoop: {
      type: Boolean,
      default: true,
    },
    raDirection: {
      type: String,
      default: 'horizontal',
    },
    raPauseOnHover: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['raChange'],
  setup(props: TCarouselProps, { emit }) {
    // ref
    const itemReact = reactive<ICarouselItem[]>([]);
    const root = ref<HTMLDivElement>();
    const offsetWidth = ref<number>();
    const offsetHeight = ref<number>();
    const activeIndex = ref<number>(0);
    const oldActiveIndex = ref<number>(0);
    const timerSign = ref<any>(null);
    const data = reactive({
      hover: false,
      itemReactLength: 0,
    });

    // watch
    watch(activeIndex, () => {
      transformItem();
      emit('raChange', activeIndex);
    });

    // mounted
    onMounted(() => {
      activeIndex.value = props.raInitialIndex;
      autoplay();
      setTheOffset();
      nextTick(() => {
        resetItemTransition();
      });
      data.itemReactLength = itemReact.length;
    });

    // ondestroy
    onUnmounted(() => {
      clearInterval(timerSign.value);
    });

    // function
    function resetItemTransition() {
      itemReact.forEach((item, index) => {
        item.transformItem(index, activeIndex.value, false);
      });
    }

    function setTheOffset() {
      props.raDirection === 'horizontal'
        ? (offsetWidth.value = root!.value!.offsetWidth)
        : (offsetHeight.value = root!.value!.offsetHeight);
    }

    function handleMouseEnter() {
      data.hover = true;
      clearInterval(timerSign.value);
    }

    function handleMouseLeave() {
      data.hover = false;
      autoplay();
    }

    function transformItem() {
      itemReact.forEach((item, index) => {
        item.transformItem(index, activeIndex.value);
      });
    }

    function indicatorClick(index: number) {
      setTheOldActiveIndex();
      activeIndex.value = index;
    }

    const thottledArrowClick = throttle((clickType: TClickType) => {
      setTheOldActiveIndex();
      if (clickType === 'left') {
        activeIndex.value = activeIndex.value - 1;
      } else if (clickType === 'right') {
        activeIndex.value = activeIndex.value + 1;
      }
      processActiveIndex();
    }, 400);

    function processActiveIndex() {
      if (activeIndex.value < 0) {
        activeIndex.value = itemReact.length - 1;
      } else if (activeIndex.value > itemReact.length - 1) {
        activeIndex.value = 0;
      }
    }

    function autoplay() {
      if (!props.raAutoplay) { return; }
      timerSign.value = setInterval(() => {
        setTheOldActiveIndex();
        activeIndex.value++;
        processActiveIndex();
      }, props.raInterval);
    }

    function setTheOldActiveIndex() {
      oldActiveIndex.value = activeIndex.value;
    }

    // methods
    function raSetActiveItem(targetIndex: number) {
      setTheOldActiveIndex();
      activeIndex.value = targetIndex;
    }

    function raPrev() {
      setTheOldActiveIndex();
      activeIndex.value--;
    }

    function raNext() {
      setTheOldActiveIndex();
      activeIndex.value++;
    }

    provide<ICarouselProvide>(CAROUSEL_ITEM_PROVIDE_TOKEN, {
      offsetHeight,
      itemReact,
      offsetWidth,
      oldActiveIndex,
      isLoop: toRefs(props).raLoop,
    });

    return {
      indicatorClick,
      props,
      root,
      thottledArrowClick,
      data,
      raSetActiveItem,
      activeIndex,
      handleMouseEnter,
      handleMouseLeave,
      raPrev,
      raNext,
    };
  },
});
</script>

<style src="./carousel.scss">
</style>
