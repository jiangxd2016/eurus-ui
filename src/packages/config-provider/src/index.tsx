import { defineComponent, getCurrentInstance, provide, reactive, renderSlot, toRefs } from 'vue';
import type { PropType } from 'vue';
import './style.scss';
import type { language } from '@/packages/_utils/constants';
import type { Size } from '@/packages/_utils/size';
import { EurusConfigProviderKey } from '@/packages/_utils/constants';

const EConfigProviderProps = {
	locale: {
		type: String as PropType<language>,
		default: 'zh-cn',
	},
	prefixCls: {
		type: String,
		default: 'E',
	},
	size: {
		type: String as PropType<Size>,
		default: 'md',
	},
	global: {
		type: Boolean,
		default: false,
	},
	// TODO: dark mode
	darkMode: {
		type: Boolean,
		default: false,
	},
};

export default defineComponent({
	name: 'EConfigProvider',
	props: EConfigProviderProps,
	setup(props, { slots }) {
		const { prefixCls, locale, size, darkMode } = toRefs(props);
		const config = reactive({
			prefixCls,
			locale,
			size,
			darkMode,
		});
		if (props.global) {
			const instance = getCurrentInstance();
			if (instance) {
				instance.appContext.app.provide(EurusConfigProviderKey, config);
			}
		} else {
			provide(EurusConfigProviderKey, config);
		}
		return () => renderSlot(slots, 'default', { config });
	},
});
