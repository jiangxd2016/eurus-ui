import { defineComponent, ref, toRefs } from 'vue';

const Props = {
  list: {
    type: Array,
    default() {
      return [];
    },
  },
};

export default defineComponent({
  name: 'DatePickerDayContent',
  props: Props,
  setup(props, { emit }) {
    const { list } = toRefs(props);

    const currentDay = ref(-1);
    // 处理天的表格点击，触发关闭时间控件面板，设置时间input的值
    const handleDayClick = (item: any) => {
      if (item.currentDay === item.index) { return; }
      currentDay.value = item.index;
      emit('dateChange', item.date);
    };

    return () => (
      <tbody class="date-picker-day-content">
        {
          list.value.map((item: any, index: number) => {
            return <tr key={index}>
              {
                item.map((subItem: any, index: number) => {
                  return <td
                    key={index} class={[
                      subItem.disbled ? 'disble-item' : 'day-item',
                      subItem.active ? 'active' : '',
                      subItem.index === currentDay.value ? 'active-click' : '',
                    ]}
                    onClick={() => handleDayClick(subItem)}>
                    {subItem.value}
                  </td>;
                })
              }
            </tr>;
          })
        }
      </tbody>
    );
  }
});
