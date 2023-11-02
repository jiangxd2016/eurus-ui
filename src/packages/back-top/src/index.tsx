import type { PropType } from 'vue';
import { Transition, defineComponent, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import './style.scss';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { isDocument, scrollTop } from '@/packages/_utils/dom';
import { warn } from '@/packages/_utils/warn';

const EBackTopProps = {
	text: {
		type: String,
		default: '返回顶部',
	},
	target: {
		type: [String, Object] as PropType<HTMLElement | string>,
		default: 'body',
	},
	height: { default: 200 },
	bottom: { default: 30 },
	right: { default: 30 },
};

export default defineComponent({
	name: 'EBackTop',
	props: EBackTopProps,
	emits: ['click'],
	setup(props, { slots, emit }) {
		const prefixCls = getPrefixCls('back-top');

		const backTopVisible = ref(false);

		let scrollListenerRegistered: boolean;
		let scrollElement: HTMLElement | Document;

		const handleScroll = () => {
			backTopVisible.value = scrollTop(scrollElement) > props.height;
		};
		const scrollToTop = () => {
			(isDocument(scrollElement) ? document.documentElement : scrollElement).scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		};
		const backTopClick = () => {
			const currentScroll = scrollTop(scrollElement);
			if (currentScroll > 0) {
				scrollToTop();
			}
			emit('click');
		};

		onMounted(() => {
			if (scrollListenerRegistered) {
				return;
			}
			scrollListenerRegistered = true;
			const { target } = props;
			const targetElement: HTMLElement | Document =
				typeof target === 'string' ? (document.querySelector(target) as HTMLElement) : target;
			if (__DEV__) {
				watchEffect(() => {
					if (!targetElement) {
						warn('back-top', 'Target is not found.');
					}
				});
			}
			scrollElement = targetElement === document.documentElement ? document : targetElement;
			scrollElement.addEventListener('scroll', handleScroll);
		});

		onBeforeUnmount(() => {
			scrollElement.removeEventListener('scroll', handleScroll);
		});

		return () => (
			<Transition name="fade-in">
				<div
					class={[prefixCls]}
					role="button"
					aria-hidden="true"
					onClick={backTopClick}
					style={{
						right: props.right + 'px',
						bottom: props.bottom + 'px',
						visibility: backTopVisible.value ? 'visible' : 'hidden',
					}}
				>
					{slots?.default ? (
						slots.default()
					) : (
						<span class={[prefixCls + '-text']} v-text={props.text}></span>
					)}
				</div>
			</Transition>
		);
	},
});
