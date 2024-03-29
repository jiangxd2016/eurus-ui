import { computed, createVNode, defineComponent } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
import type { PropType } from 'vue';
import type { TableDataWithRaw } from './interface';

export default defineComponent({
	name: 'ETr',
	props: {
		expand: {
			type: Boolean,
		},
		empty: {
			type: Boolean,
		},
		checked: {
			type: Boolean,
		},
		rowIndex: Number,
		record: {
			type: Object as PropType<TableDataWithRaw>,
			default: () => ({}),
		},
	},
	emits: ['click'],
	setup(props, { slots }) {
		const prefixCls = getPrefixCls('table');

		const cls = computed(() => [
			`${prefixCls}-tr`,
			{
				[`${prefixCls}-tr-expand`]: props.expand,
				[`${prefixCls}-tr-empty`]: props.empty,
				[`${prefixCls}-tr-checked`]: props.checked,
			},
		]);

		return () => {
			return createVNode(
				slots.tr?.({
					rowIndex: props.rowIndex,
					record: props.record?.raw,
				})[0] ?? 'tr',
				{ class: cls.value },
				{
					default: slots.default,
				},
			);
		};
	},
});
