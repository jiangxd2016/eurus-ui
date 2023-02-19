import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import Icon from '@/packages/icons';
import { getPrefixCls } from '@/packages/_utils/global-config';

const DateHeaderProps = {
  date: {
    type: Array as PropType<number[]>,
    default() {
      return [new Date().getFullYear(), new Date().getMonth() + 1];
    },
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
      emit('dateRangeChange', type);
    };
    return () => (
      <div class={prefixCls}>
        <div class="arrow-left">
          <Icon name="doubleLeft" size="16" class="arrow" onClick={() => toggleDate('lastYear')}></Icon>
          <Icon name="chevronLeft" size="16" class="arrow" onClick={() => toggleDate('lastMonth')}></Icon>
        </div>
        <div class="date-content">{props.date[0] + '-' + props.date[1]}</div>
        <div class="arrow-right">
          <Icon name="chevronRight" size="16" class="arrow" onClick={() => toggleDate('nextMonth')}></Icon>
          <Icon name="doubleRight" size="16" class="arrow" onClick={() => toggleDate('nextYear')}></Icon>
        </div>
      </div>
    );
  }
});
