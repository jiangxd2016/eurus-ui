import { computed, defineComponent, reactive } from 'vue';
import type { PropType } from 'vue';
import './style.scss';

import type { Size } from '@/packages/_utils/size';
import { getPrefixCls } from '@/packages/_utils/global-config';

const EAvatarProps = {
	size: {
		type: String as PropType<Size>,
		default: 'md',
	},
	color: {
		type: String,
		default: '#fff',
	},
	offline: {
		type: Boolean,
		default: false,
	},
	online: {
		type: Boolean,
		default: false,
	},
	notice: {
		type: Boolean,
		default: false,
	},
	count: {
		type: Number,
		default: 0,
	},
};

export default defineComponent({
	name: 'EAvatar',
	props: EAvatarProps,
	setup(props, { slots }) {
		const prefixCls = getPrefixCls('avatar');

		const mergeStyles = computed(() => {
			return {
				'background-color': props.color,
			};
		});

		const clsName = reactive({
			offline: props.offline,
			online: props.online,
			notice: props.notice,
		});
		return () => (
			<div class={[prefixCls, props.size, clsName]} style={mergeStyles.value}>
				{slots.default && slots.default()}
				{(props.offline || props.online) && <div class="dot" />}
				{props.notice && <div class="reddot" data-count={props.count} />}
			</div>
		);
	},
});
