import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import './style.scss';
import type { Size } from '@/packages/_utils/size';
import { getPrefixCls } from '@/packages/_utils/global-config';

const EDividerProps = {
	dashed: {
		type: Boolean,
		default: false,
	},
	direction: {
		type: String as PropType<'horizontal' | 'vertical'>,
		default: 'horizontal',
	},
	size: {
		type: String as PropType<Size>,
		default: 'md',
	},
	color: {
		type: String,
		default: '',
	},
	// 文字位置
	orientation: {
		type: String as PropType<'left' | 'center' | 'right'>,
		default: 'center',
	},
};

export default defineComponent({
	name: 'EDivider',
	props: EDividerProps,
	setup(props, { slots }) {
		const prefixCls = getPrefixCls('divider');
		const computedCls = computed(() => {
			const { direction, dashed, size } = props;
			return {
				[`${prefixCls}`]: true,
				[`${prefixCls}-${direction}`]: true,
				[`${prefixCls}-dashed`]: dashed,
				[`${prefixCls}-${size}`]: size,
			};
		});
		return () => (
			<div role="separator" class={computedCls.value}>
				{slots.default && (
					<span
						class={`${prefixCls}-text ${prefixCls}-text-${props.orientation}`}
						style={{ color: props.color }}
					>
						{slots.default()}
					</span>
				)}
			</div>
		);
	},
});
