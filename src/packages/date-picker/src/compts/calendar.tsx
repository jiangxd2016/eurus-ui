import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import { getPrefixCls } from '@/packages/_utils/global-config';
import type { datePickerItem } from '@/packages/_utils/date';

const CalendarProps = {
  modelValue: Date,

  disabledDate: {
    type: Function as PropType<(date: string, type: String) => boolean>,
    default() {
      return () => {
      };
    }
  },
  panel: {
    type: String as PropType<'month' | 'year'>,
    default: 'month',
  },
  list: {
    type: Array as PropType<datePickerItem[][]>,
    default() {
      return () => [];
    },
  },
};

export default defineComponent({
  name: 'Calendar',
  props: CalendarProps,
  emits: ['dateChange'],
  setup(props, { emit }) {

    const prefixCls = getPrefixCls('date-picker-calendar');

    const handleMonthClick = (item: datePickerItem) => {
      if (item.disabled) {
        return;
      }
      emit('dateChange', item.date);
    };
    return () => (
      <div class={prefixCls}>

        <table>
          {
            props.list.map((item) => {
              return (
                <tr>
                  {
                    item.map((subItem) => {
                      return (
                        <td class={[subItem.dot && 'calendar-date-select', subItem.disabled && 'calendar-date-disabled']} >
                          <div role="button" tabindex={0}onClick={() => handleMonthClick(subItem)}>
                          {subItem.format}
                          </div>
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </table>
      </div>

    );
  }
});
