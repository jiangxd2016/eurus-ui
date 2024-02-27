import { defineComponent } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
import DateWeekBar from './DateWeekBar';
import DateDayList from './DateDayList';
import type { PropType } from 'vue';
import type { datePickerItem } from '@/packages/_utils/date';

const DateBodyProps = {
	// 表格数据
	list: {
		type: Array as PropType<datePickerItem[][]>,
		default() {
			return () => [];
		},
	},
};
export default defineComponent({
	name: 'DateBody',
	props: DateBodyProps,
	emits: ['dateChange', 'dateHover'],
	setup(props, { emit }) {
		const prefixCls = getPrefixCls('date-picker-body');

		const dateChange = (date: string) => {
			emit('dateChange', date);
		};
		const dateHover = (date: string) => {
			emit('dateHover', date);
		};
		return () => (
			<div class={prefixCls}>
				<table>
					<DateWeekBar />
					<DateDayList list={props.list} onDateChange={dateChange} onDateHover={dateHover} />
				</table>
			</div>
		);
	},
});
