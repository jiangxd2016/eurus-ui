export function getCurrentMonthCount([year, month]: any) {
  return new Date(year, month, 0).getDate();
}

export function getFirstMonthDayWeek([year, month]: any) {
  return new Date(year, month - 1, 1).getDay();
}

export function genarateDayData([year, month]: any) {

  // 获取上月天数
  let lastMonthCount = getCurrentMonthCount([year, month - 1]);
  // 获取当月天数
  const currentMonthCount = getCurrentMonthCount([year, month]);
  // 获取当月1号星期
  const currentMonthFirstDayWeek = getFirstMonthDayWeek([year, month]);
  const dayList = [];
  let lastMonthPointer = 1;
  let currentMonthPoiner = 1;
  let nextMonthPointer = 1;
  // 根据日期组件的天数布局，共计42天，包含上月剩余天数+当月天数+下月初始天数
  for (let i = 0; i < 42; i++) {
    // 上个月需要渲染的td个数，以及对应的值
    if (lastMonthPointer <= currentMonthFirstDayWeek) {
      // 上月
      dayList.unshift({
        value: lastMonthCount--,
        disbled: true,
        date: year + '-' + (month - 1) + '-' + (lastMonthCount + 1),
        index: i,
      });
      lastMonthPointer++;
    } else if (currentMonthPoiner <= currentMonthCount) {
      // 当月
      dayList.push({
        value: currentMonthPoiner++,
        disbled: false,
        active:
          new Date().getFullYear() === year
          && new Date().getMonth() + 1 === month
          && currentMonthPoiner - 1 === new Date().getDate(),
        date: year + '-' + month + '-' + (currentMonthPoiner - 1),
        index: i,
      });
    } else {
      // 下月
      dayList.push({
        value: nextMonthPointer++,
        disbled: true,
        date: year + '-' + (month + 1) + '-' + (nextMonthPointer - 1),
        index: i,
      });
    }
  }

  const result = [];
  let index = 1;
  let i = 0;
  while (index <= 6) {
    const arr = [];
    for (let j = 0; j < 7; j++) {
      arr.push(dayList[i]);
      i++;
    }
    result.push(arr);
    index++;
  }
  return result;
}
// 用于保存组建的常量，静态数据，比如表头的星期
export const weekList = ['日', '一', '二', '三', '四', '五', '六'];
