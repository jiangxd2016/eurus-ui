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
  Transition,
} from 'vue';
import './style.scss';

import { throttle } from '@estjs/tools';
import type {
  ICarouselItem,
  ICarouselProvide,
  TClickType
} from './carousel';
import {
  CAROUSEL_ITEM_PROVIDE_TOKEN
} from './carousel';
import EIcon from '@/packages/icons';

const ECarouselProps = {
  height: {
    type: String,
    default: '',
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Number,
    default: 1000,
  },

  loop: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  pauseOnHover: {
    type: Boolean,
    default: false,
  },
};
export default defineComponent({
  name: 'ECarousel',
  props: ECarouselProps,
  emits: ['raChange'],
  setup(props, { emit, slots }) {
    const itemReact = reactive<ICarouselItem[]>([]);
    const rootRef = ref<HTMLDivElement>();
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
      activeIndex.value = props.initialIndex;
      autoplay();
      setTheOffset();
      nextTick(() => {
        resetItemTransition();
      });
      data.itemReactLength = itemReact.length;
    });

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

      props.direction === 'horizontal'
        ? (offsetWidth.value = rootRef!.value!.offsetWidth)
        : (offsetHeight.value = rootRef!.value!.offsetHeight);
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
      if (!props.autoplay) { return; }
      timerSign.value = setInterval(() => {
        setTheOldActiveIndex();
        activeIndex.value++;
        processActiveIndex();
      }, props.interval);
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
      isLoop: toRefs(props).loop,
    });

    return () => (
      <div
        ref={rootRef} class="e-carousel" style={{ height: props.height }} onMouseenter={handleMouseEnter}
        onMouseleave={handleMouseLeave}
      >

        <Transition name="carousel-arrow-left">
          { <button
              class="e-carousel__arrow e-carousel__arrow--left"
              onClick={()=>thottledArrowClick('left')}
            >
             < EIcon name='chevronLeft' size={30} color="#fff"></EIcon>
            </button>
          }

        </Transition>

        <Transition name="carousel-arrow-right">
          { <button
              class="e-carousel__arrow e-carousel__arrow--right"
              onClick={()=>thottledArrowClick('right')}
            >
          < EIcon name='chevronRight' size={30} color="#fff"></EIcon>
            </button>
          }
        </Transition>
        {slots.default ? slots.default() : null}
        <div
          class={['e-carousel__indicator',
            props.direction === 'horizontal'
              ? 'e-carousel__indicator--horizontal'
              : props.direction === 'vertical'
                ? 'e-carousel__indicator--vertical'
                : '',
          ]}
        >
          {

            Array.from({ length: data.itemReactLength }).map((item, index) => {
              return <div
                key={index} class="e-carousel__item"
                onClick={() => indicatorClick(index)}
              >
                <button
                  class={{
                    'e-carousel__button': true,
                    'is-active': index === activeIndex.value,
                    'e-carousel__button--horizontal': props.direction === 'horizontal',
                    'e-carousel__button--vertical': props.direction === 'vertical',
                  }}
                />
              </div>;
            })
          }

        </div >

      </div >
    );
  },
});
