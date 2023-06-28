import { defineComponent, ref, toRefs } from 'vue';
import type { PropType } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
import type { datePickerItem } from '@/packages/_utils/date';

const DateDayListProps = {
  list: {
    type: Array as PropType<datePickerItem[][]>,
    default() {
      return () => [];
    },
  },
};

export default defineComponent({
  name: 'DateDayList',
  props: DateDayListProps,
  emits: ['dateChange', 'dateHover'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('date-picker-day-list');
    const { list } = toRefs(props);

    const currentDay = ref(-1);
    // 处理天的表格点击，触发关闭时间控件面板，设置时间input的值
    const handleDayClick = (item: datePickerItem) => {
      if (currentDay.value === item.index) {
        return;
      }
      currentDay.value = item.index;
      emit('dateChange', item.date);
    };

    const handleDayHover = (item: datePickerItem) => {
      if (currentDay.value === item.index) {
        return;
      }
      emit('dateHover', item.date);
    };

    return () => (
      <tbody class={prefixCls}>
        {list.value.map((item: datePickerItem[], idx: number) => {
          return (
            <tr key={idx}>
              {item.map((subItem: datePickerItem, index: number) => {
                return (
                  <td
                    key={index}
                    class={[
                      subItem.disabled ? 'disable-item' : 'day-item',
                      subItem.active ? 'active' : '',
                      subItem.dot ? 'dot' : '',
                      subItem.hover ? 'hover' : '',
                    ]}
                    role="gridcell"
                    onMouseenter={() => handleDayHover(subItem)}
                    onClick={() => handleDayClick(subItem)}
                  >
                    <div class="item-value">{subItem.value}</div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  },
});
