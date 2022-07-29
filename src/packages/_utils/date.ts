import type { Dayjs, OpUnitType, UnitType } from 'dayjs';
import originDayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import weekYear from 'dayjs/plugin/weekYear';
import QuarterOfYear from 'dayjs/plugin/quarterOfYear';
import { isDayjs } from './isType';
import 'dayjs/locale/zh-cn';

const overwriteIsDayjs = (_: any, Dayjs: any, dayjs: any) => {
  // eslint-disable-next-line func-names
  dayjs = function (date: Dayjs, c: any) {
    if (isDayjs(date)) {
      return date.clone();
    }
    const cfg = typeof c === 'object' ? c : {};
    cfg.date = date;
    cfg.args = arguments; // eslint-disable-line prefer-rest-params
    return new Dayjs(cfg);
  };

  const proto = Dayjs.prototype;
  const old$Utils = proto.$utils;
  proto.$utils = () => {
    const newUtils = old$Utils();
    newUtils.i = isDayjs;
    return newUtils;
  };

  dayjs.isDayjs = isDayjs;
};

originDayjs.extend(overwriteIsDayjs);
originDayjs.extend(customParseFormat);
originDayjs.extend(isBetween);
originDayjs.extend(weekOfYear);
originDayjs.extend(AdvancedFormat);
originDayjs.extend(weekYear);
originDayjs.extend(QuarterOfYear);

export const dayjs = originDayjs;

export const methods = {
  add(time: Dayjs, value: number, unit: UnitType) {
    return time.add(value, unit);
  },
  subtract(time: Dayjs, value: number, unit: UnitType) {
    return time.subtract(value, unit);
  },
  startOf(time: Dayjs, unit: OpUnitType) {
    return time.startOf(unit);
  },
  endOf(time: Dayjs, unit: OpUnitType) {
    return time.endOf(unit);
  },
  set(time: Dayjs, unit: UnitType, value: number) {
    return time.set(unit, value);
  },
  isSameWeek(
    date1: Dayjs,
    date2: Dayjs,
    weekStart: number,
    localeName: string
  ) {
    return date1
      .locale({ ...dayjs.Ls[localeName.toLocaleLowerCase()], weekStart })
      .isSame(date2, 'week');
  },
};

export function getNow() {
  return dayjs();
}

export function getSortedDayjsArray(values: Dayjs[]) {
  return [...values].sort((a, b) => a.valueOf() - b.valueOf());
}
