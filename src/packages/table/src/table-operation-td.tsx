import { computed, defineComponent, inject } from 'vue';
import Checkbox from '@/packages/checkbox';
import Radio from '@/packages/radio';
import Icons from '@/packages/icons';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { tableInjectionKey } from './context';
import { getLeafKeys, getOperationFixedCls, getOperationStyle, getSelectionStatus } from './utils';
import type { TableDataWithRaw, TableOperationColumn } from './interface';
import type { BaseType } from '@/packages/_utils/types';
import type { TableContext } from './context';
import type { PropType, VNode } from 'vue';

export default defineComponent({
	name: 'OperationTd',
	components: {
		Checkbox,
		Radio,
	},
	props: {
		operationColumn: {
			type: Object as PropType<TableOperationColumn>,
			required: true,
		},
		operations: {
			type: Array as PropType<TableOperationColumn[]>,
			required: true,
		},
		record: {
			type: Object as PropType<TableDataWithRaw>,
			required: true,
		},
		hasExpand: {
			type: Boolean,
			default: false,
		},
		selectedRowKeys: {
			type: Array as PropType<BaseType[]>,
		},
		renderExpandBtn: {
			type: Function as PropType<(record: TableDataWithRaw, stopPropagation?: boolean) => VNode>,
		},
		colSpan: {
			type: Number,
			default: 1,
		},
		rowSpan: {
			type: Number,
			default: 1,
		},
		summary: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['select'],
	setup(props, { emit, slots }) {
		const prefixCls = getPrefixCls('table');
		const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {});
		const style = computed(() => getOperationStyle(props.operationColumn, props.operations));

		const cls = computed(() => [
			`${prefixCls}-td`,
			`${prefixCls}-operation`,
			{
				[`${prefixCls}-checkbox`]: props.operationColumn.name === 'selection-checkbox',
				[`${prefixCls}-radio`]: props.operationColumn.name === 'selection-radio',
				[`${prefixCls}-expand`]: props.operationColumn.name === 'expand',
				[`${prefixCls}-drag-handle`]: props.operationColumn.name === 'drag-handle',
			},
			...getOperationFixedCls(prefixCls, props.operationColumn),
		]);

		const leafKeys = computed(() => getLeafKeys(props.record));

		const selectionStatus = computed(() =>
			getSelectionStatus(tableCtx.currentSelectedRowKeys ?? [], leafKeys.value),
		);

		const renderContent = () => {
			if (props.summary) {
				return null;
			}
			if (props.operationColumn.render) {
				return props.operationColumn.render(props.record.raw);
			}
			if (props.operationColumn.name === 'selection-checkbox') {
				const value = props.record.key;

				if (!tableCtx.checkStrictly && !props.record.isLeaf) {
					return (
						<Checkbox
							modelValue={selectionStatus.value.checked}
							disabled={Boolean(props.record.disabled)}
							onChange={checked => tableCtx.onSelectAllLeafs?.(props.record, checked as boolean)}
							onClick={(ev: Event) => ev.stopPropagation()}
						/>
					);
				}

				return (
					<Checkbox
						modelValue={props.selectedRowKeys?.includes(value) ?? false}
						disabled={Boolean(props.record.disabled)}
						onChange={checked => tableCtx.onSelect?.(checked as boolean, props.record)}
						onClick={(ev: Event) => ev.stopPropagation()}
					/>
				);
			}
			if (props.operationColumn.name === 'selection-radio') {
				const value = props.record.key;
				return (
					<Radio
						modelValue={props.selectedRowKeys?.includes(value) ?? false}
						disabled={Boolean(props.record.disabled)}
						onChange={checked => tableCtx.onSelect?.(checked as boolean, props.record)}
						onClick={(ev: Event) => ev.stopPropagation()}
					/>
				);
			}
			if (props.operationColumn.name === 'expand') {
				if (props.hasExpand && props.renderExpandBtn) {
					return props.renderExpandBtn(props.record);
				}
				return null;
			}
			if (props.operationColumn.name === 'drag-handle') {
				return slots['drag-handle-icon']?.() ?? <Icons name="DragDotVertical" />;
			}
			return null;
		};

		return () => (
			<td
				class={cls.value}
				style={style.value}
				rowspan={props.rowSpan > 1 ? props.rowSpan : undefined}
				colspan={props.colSpan > 1 ? props.colSpan : undefined}
			>
				<span class={`${prefixCls}-cell`}>{renderContent()}</span>
			</td>
		);
	},
});
