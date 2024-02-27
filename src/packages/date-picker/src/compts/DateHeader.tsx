import { defineComponent } from 'vue';
import Icon from '@/packages/icons';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { stopPropagation } from '@/packages/_utils/shared';
import type { PropType } from 'vue';

const DateHeaderProps = {
	date: {
		type: Array as PropType<number[]>,
		default() {
			return [new Date().getFullYear(), new Date().getMonth() + 1];
		},
	},
	type: {
		type: String as PropType<'month' | 'day'>,
		default: 'date',
	},
};

export type dateChangeType = 'lastYear' | 'lastMonth' | 'nextMonth' | 'nextYear';
export default defineComponent({
	name: 'DateHeader',
	props: DateHeaderProps,
	emits: ['dateRangeChange'],
	setup(props, { emit }) {
		const prefixCls = getPrefixCls('date-picker-header');
		const toggleDate = (type: dateChangeType) => {
			emit('dateRangeChange', type, props.date);
		};
		return () => (
			<div class={prefixCls} role="link" tabindex={0} onClick={stopPropagation}>
				<div class="arrow-left">
					{props.type === 'day' && (
						<Icon
							name="doubleLeft"
							size="16"
							color="#848b99"
							class="arrow"
							onClick={() => toggleDate('lastYear')}
						></Icon>
					)}
					<Icon
						name="chevronLeft"
						size="18"
						color="#848b99"
						class="arrow"
						onClick={() => toggleDate('lastMonth')}
					></Icon>
				</div>
				<div class="date-content">
					{props.date[0] + (props.type !== 'month' ? `-${props.date[1]}` : '')}
				</div>
				<div class="arrow-right">
					<Icon
						name="chevronRight"
						size="18"
						color="#848b99"
						class="arrow"
						onClick={() => toggleDate('nextMonth')}
					></Icon>
					{props.type === 'day' && (
						<Icon
							name="doubleRight"
							size="16"
							color="#848b99"
							class="arrow"
							onClick={() => toggleDate('nextYear')}
						></Icon>
					)}
				</div>
			</div>
		);
	},
});
