import type { PropType } from 'vue';
import { defineComponent, onMounted, onUnmounted, onUpdated } from 'vue';
import './style.scss';
import { getPrefixCls, toKebabCase } from '@/packages/_utils';
import EIcons from '@/packages/icons';
import EButton from '@/packages/button';
import type { MessageType } from '@/packages/_utils';

export const EMessageProps = {
	type: {
		type: String as PropType<MessageType | 'loading' | 'normal'>,
		default: 'info',
	},
	closable: {
		type: Boolean,
		default: false,
	},
	showIcon: {
		type: Boolean,
		default: true,
	},
	duration: {
		type: Number,
		default: 3000,
	},
	resetOnUpdate: {
		type: Boolean,
		default: false,
	},
	resetOnHover: {
		type: Boolean,
		default: false,
	},
};

export default defineComponent({
	name: 'EMessage',
	props: EMessageProps,
	emits: ['close'],
	setup(props, { slots, emit }) {
		const prefixCls = getPrefixCls('message');
		let timer = 0;
		const iconName = toKebabCase(props.type);

		const handleClose = () => {
			emit('close');
		};

		const startTimer = () => {
			if (props.duration > 0) {
				timer = window.setTimeout(handleClose, props.duration);
			}
		};

		const clearTimer = () => {
			if (timer) {
				window.clearTimeout(timer);
				timer = 0;
			}
		};

		onMounted(() => {
			startTimer();
		});

		onUpdated(() => {
			if (props.resetOnUpdate) {
				clearTimer();
				startTimer();
			}
		});

		onUnmounted(() => {
			clearTimer();
		});

		const handleMouseEnter = () => {
			if (props.resetOnHover) {
				clearTimer();
			}
		};

		const handleMouseLeave = () => {
			if (props.resetOnHover) {
				startTimer();
			}
		};
		return () => (
			<li
				role="alert"
				class={[
					prefixCls,
					`${prefixCls}-${props.type}`,
					{ [`${prefixCls}-closable`]: props.closable },
				]}
				onMouseenter={handleMouseEnter}
				onMouseleave={handleMouseLeave}
			>
				{props.showIcon && (
					<EIcons
						name={iconName}
						class={`${prefixCls}-icon ${prefixCls}-icon-${props.type}`}
						size="sm"
					></EIcons>
				)}
				<div class={`${prefixCls}-content`}>{slots.default?.()}</div>
				{props.closable && (
					<EButton
						round
						type="text"
						class={`${prefixCls}-close`}
						onClick={handleClose}
						v-slots={{ default: () => <EIcons name="close" color="#aaa" /> }}
					></EButton>
				)}
			</li>
		);
	},
});
