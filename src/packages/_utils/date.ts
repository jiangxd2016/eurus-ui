import dayjs from 'dayjs';
import type { Ref } from 'vue';
import useLocaleTransform from '@/packages/_hooks/localeTransform';

const isBetween = (value: typeof dayjs, left: number, right: number) => {
  return dayjs(value).isBefore(dayjs(right)) && dayjs(value).isAfter(dayjs(left));
};

export function getCurrentMonthCount(month: string) {
  return dayjs(month).daysInMonth();
}

export function getFirstMonthDayWeek(month: string) {
  return dayjs(month).day();
}

export interface datePickerItem {
  value: number;
  disabled: boolean;
  date: number;
  format: string;
  active?: boolean;
  index: number;
  dot: boolean;
  hover: boolean;
}

export function generateDayList([year, month]: number[], disabled: Function): datePickerItem[][] {
  const listMonth = `${year}-${month - 1}-1`;
  const currentMonth = `${year}-${month}-1`;
  // 获取上月天数
  let lastMonthCount = getCurrentMonthCount(listMonth);
  // 获取当月天数
  const currentMonthCount = getCurrentMonthCount(currentMonth);
  // 获取当月1号星期几
  const currentMonthFirstDayWeek = getFirstMonthDayWeek(currentMonth);

  const dayList = [];
  let lastMonthPointer = 1;
  let currentMonthPointer = 1;
  let nextMonthPointer = 1;
  // 根据日期组件的天数布局，共计42天，包含上月剩余天数+当月天数+下月初始天数
  for (let i = 0; i < 42; i++) {
    // 上个月需要渲染的td个数，以及对应的值
    if (lastMonthPointer < currentMonthFirstDayWeek) {
      // 上月
      const date = dayjs(year + '-' + (month - 1) + '-' + (lastMonthCount));
      dayList.unshift({
        value: lastMonthCount--,
        disabled: true,
        hover: false,
        dot: false,
        date: date.valueOf(),
        format: date.format('YYYY-MM-DD'),
        index: i,
      });
      lastMonthPointer++;
    } else if (currentMonthPointer <= currentMonthCount) {
      // 当月
      const date = dayjs(year + '-' + month + '-' + (currentMonthPointer));

      dayList.push({
        value: currentMonthPointer++,
        disabled: !disabled(date),
        active: false,
        date: date.valueOf(),
        format: date.format('YYYY-MM-DD'),
        dot:
          new Date().getFullYear() === year
          && new Date().getMonth() + 1 === month
          && currentMonthPointer - 1 === new Date().getDate(),
        hover: false,
        index: i,
      });
    } else {
      // 下月
      const date = dayjs(year + '-' + (month + 1) + '-' + (nextMonthPointer - 1));
      dayList.push({
        value: nextMonthPointer++,
        disabled: true,
        hover: false,
        dot: false,
        date: date.valueOf(),
        format: date.format('YYYY-MM-DD'),
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

export function generateMonthList([year, month]: number[], disabled: Function): datePickerItem[][] {
  const t = useLocaleTransform();
  const monthListStr = [
    t('datePicker.month.short.January'),
    t('datePicker.month.short.February'),
    t('datePicker.month.short.March'),
    t('datePicker.month.short.April'),
    t('datePicker.month.short.May'),
    t('datePicker.month.short.June'),
    t('datePicker.month.short.July'),
    t('datePicker.month.short.August'),
    t('datePicker.month.short.September'),
    t('datePicker.month.short.October'),
    t('datePicker.month.short.November'),
    t('datePicker.month.short.December')
  ];

  const monthList = [];
  for (let i = 1; i <= 12; i++) {
    const date = dayjs(year + '-' + i + '-' + 1);
    monthList.push({
      value: i,
      disabled: !disabled(date),
      active: false,
      date: date.valueOf(),
      format: monthListStr[i - 1],
      dot: month === i,
      hover: false,
      index: i - 1,
    });
  }

  const result = [];
  let index = 1;
  let i = 0;
  while (index <= 4) {
    const arr = [];
    for (let j = 0; j < 3; j++) {
      arr.push(monthList[i]);
      i++;
    }
    result.push(arr);
    index++;
  }
  return result;
}

export const setDateRangeListActive = (date: (string | number)[], list: Ref<any[]>) => {
  list.value = list.value.map((i: datePickerItem[]) => {
    return i.map((j: datePickerItem) => {
      j.active = date.includes(j.date);
      return j;
    });
  });
};
export const setDateRangeListHover = (date: string | number, list: Ref<any[]>, clear = false, currentDate: string[]) => {
  list.value = list.value.map((i: datePickerItem[]) => {
    return i.map((j: datePickerItem) => {
      j.hover = clear ? false : isBetween(dayjs(j.date), dayjs(currentDate[0]), dayjs(date));
      j.active = dayjs(j.date).isSame(dayjs(date));
      return j;
    });
  });

};
