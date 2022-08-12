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

    return () => (
      <div
        ref={rootRef} class="ra-carousel" style={{ height: props.raHeight }} onMouseenter={handleMouseEnter}
        onMouseleave={handleMouseLeave}
      >

        <Transition name="carousel-arrow-left">
          {props.raDirection === 'horizontal' && data.hover
            && <button
              class="ra-carousel__arrow ra-carousel__arrow--left"
              onClick={thottledArrowClick('left')}
            >
             < EIcon name='chevronLeft' size={30}></EIcon>
            </button>
          }

        </Transition>

        <Transition name="carousel-arrow-right">
          {props.raDirection === 'horizontal' && data.hover
            && <button
              class="ra-carousel__arrow ra-carousel__arrow--right"
              onClick={thottledArrowClick('right')}
            >
          < EIcon name='chevronRight' size={30}></EIcon>
            </button>
          }
        </Transition>
        {slots.default ? slots.default() : null}
        <div
          class={['ra-carousel__indicator',
            props.raDirection === 'horizontal'
              ? 'ra-carousel__indicator--horizontal'
              : props.raDirection === 'vertical'
                ? 'ra-carousel__indicator--vertical'
                : '',
          ]}
        >
          {

            Array.from({ length: data.itemReactLength }).map((item, index) => {
              return <div
                key={index} class="ra-carousel__item"
                onClick={() => indicatorClick(index)}
              >
                <button
                  class={{
                    'ra-carousel__button': true,
                    'is-active': index === activeIndex.value,
                    'ra-carousel__button--horizontal': props.raDirection === 'horizontal',
                    'ra-carousel__button--vertical': props.raDirection === 'vertical',
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
