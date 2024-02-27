import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import './style.scss';
import { getPrefixCls } from '@/packages/_utils/global-config';
import EIcon from '@/packages/icons';
import size from '@/packages/input/demo/Size.vue';
import type { Size } from '@/packages/_utils/size';

type tagType = 'default' | 'primary' | 'positive' | 'warning' | 'danger' | 'info';
const ETagProps = {
	type: {
		type: String as PropType<tagType>,
		default: 'default',
	},
	closable: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	color: { default: '' },
	borderColor: { default: '' },
	bgColor: { default: '' },
	size: {
		type: String as PropType<Size>,
		default: 'md',
	},
};

export default defineComponent({
	name: 'ETag',
	props: ETagProps,
	emits: ['click', 'close'],
	setup(props, { slots, emit }) {
		const prefixCls = getPrefixCls('tag');

		const computedCls = computed(() => {
			return {
				[prefixCls]: true,
				[`${prefixCls}-${props.type}`]: props.type,
				[`${prefixCls}-${props.size}`]: props.size,
				[`${prefixCls}-disabled`]: props.disabled,
			};
		});

		const closeClick = (e: Event) => {
			emit('close', e);
		};
		const tagClick = (e: Event) => {
			emit('click', e);
		};

		return () => (
			<span
				role="presentation"
				aira-label="tag"
				class={computedCls.value}
				style={{
					color: props.color,
					borderColor: props.borderColor,
					backgroundColor: props.bgColor,
				}}
				onClick={tagClick.bind(this)}
			>
				{slots?.default && slots.default()}
				{props.closable && (
					<span onClick={closeClick} aria-hidden="true" class={`${prefixCls}-icon`}>
						<EIcon name="close" size={size.value}></EIcon>
					</span>
				)}
			</span>
		);
	},
});
