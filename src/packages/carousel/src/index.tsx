import {
	Transition,
	computed,
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
import './style.scss';
import EIcon from '@/packages/icons';
import { getPrefixCls } from '@/packages/_utils/global-config';
import type { ICarouselItem } from '@/packages/_utils/constants';
import { CarouselKey } from '@/packages/_utils/constants';
import { throttle } from '@/packages/_utils/shared';

const ECarouselProps = {
	height: {
		type: String,
		default: '300px',
	},
	initialIndex: {
		type: Number,
		default: 0,
	},
	interval: {
		type: Number,
		default: 3000,
	},
	autoplay: {
		type: Boolean,
		default: true,
	},
	loop: {
		type: Boolean,
		default: true,
	},
	direction: {
		type: String,
		default: 'horizontal',
	},
};

export type TClickType = 'left' | 'right';

export default defineComponent({
	name: 'ECarousel',
	props: ECarouselProps,
	emits: ['change'],
	setup(props, { slots, emit }) {
		const prefixCls = getPrefixCls('carousel');

		const rootRef = ref<HTMLElement>();

		const itemReact = reactive<ICarouselItem[]>([]);

		const offsetWidth = ref<number>(0);
		const offsetHeight = ref<number>(0);
		const activeIndex = ref<number>(0);
		const oldActiveIndex = ref<number>(0);
		const timerSign = ref<any>(null);
		const data = reactive({
			hover: false,
			itemReactLength: 0,
		});

		const indicatorComputed = computed(() => {
			return [
				`${prefixCls}__indicator`,
				{
					[`${prefixCls}__indicator--horizontal`]: props.direction === 'horizontal',
					[`${prefixCls}__indicator--vertical`]: props.direction === 'vertical',
				},
			];
		});

		// watch
		watch(activeIndex, () => {
			transformItem();
			emit('change', activeIndex);
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

		const throttleArrowClick = throttle((clickType: TClickType) => {
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
			if (!props.autoplay) {
				return;
			}
			timerSign.value = setInterval(() => {
				setTheOldActiveIndex();
				activeIndex.value++;
				processActiveIndex();
			}, props.interval);
		}

		function setTheOldActiveIndex() {
			oldActiveIndex.value = activeIndex.value;
		}

		provide(CarouselKey, {
			offsetHeight,
			itemReact,
			offsetWidth,
			oldActiveIndex,
			isLoop: toRefs(props).loop,
		});

		return () => (
			<div
				class={prefixCls}
				ref={rootRef}
				style={{ height: props.height }}
				onMouseenter={handleMouseEnter}
				onMouseleave={handleMouseLeave}
			>
				<Transition name="carousel-arrow-left">
					{
						<button
							class={`${prefixCls}-arrow ${prefixCls}-arrow--left`}
							onClick={() => throttleArrowClick('left')}
						>
							<EIcon name="chevronLeft" size={30} color="#fff"></EIcon>
						</button>
					}
				</Transition>
				<Transition name="carousel-arrow-right">
					{
						<button
							class={`${prefixCls}-arrow ${prefixCls}-arrow--right`}
							onClick={() => throttleArrowClick('right')}
						>
							<EIcon name="chevronRight" size={30} color="#fff"></EIcon>
						</button>
					}
				</Transition>
				{slots.default ? slots.default() : null}
				<div role="list" class={indicatorComputed.value}>
					{Array.from({ length: data.itemReactLength }).map((item, index) => {
						return (
							<div
								key={index}
								class={`${prefixCls}__item`}
								role="none"
								onClick={() => indicatorClick(index)}
							>
								<button
									class={{
										[`${prefixCls}__button`]: true,
										'is-active': index === activeIndex.value,
										[`${prefixCls}__button--horizontal`]: props.direction === 'horizontal',
										[`${prefixCls}__button--vertical`]: props.direction === 'vertical',
									}}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	},
});
