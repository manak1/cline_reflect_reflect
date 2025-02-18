import {
  startOfWeek,
  endOfWeek,
  format,
  getWeek,
  addWeeks,
  subWeeks,
  isWithinInterval,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import type { WeekInfo } from '../types/kpt';

/** 現在の週の情報を取得する */
export function getCurrentWeekInfo(): WeekInfo {
  const now = new Date();
  return {
    startDate: startOfWeek(now, { locale: ja }),
    endDate: endOfWeek(now, { locale: ja }),
    weekNumber: getWeek(now, { locale: ja }),
  };
}

/** 指定された日付の週の情報を取得する */
export function getWeekInfo(date: Date): WeekInfo {
  return {
    startDate: startOfWeek(date, { locale: ja }),
    endDate: endOfWeek(date, { locale: ja }),
    weekNumber: getWeek(date, { locale: ja }),
  };
}

/** 現在の週の次の週の情報を取得する */
export function getNextWeek(currentWeek: WeekInfo): WeekInfo {
  const nextWeekStart = addWeeks(currentWeek.startDate, 1);
  return getWeekInfo(nextWeekStart);
}

/** 現在の週の前の週の情報を取得する */
export function getPreviousWeek(currentWeek: WeekInfo): WeekInfo {
  const prevWeekStart = subWeeks(currentWeek.startDate, 1);
  return getWeekInfo(prevWeekStart);
}

/** 
 * 週の範囲を文字列にフォーマットする
 * @returns 「M/d(E) 〜 M/d(E)」形式の文字列（例：2/17(月) 〜 2/23(日)）
 */
export function formatWeekRange(weekInfo: WeekInfo): string {
  return `${format(weekInfo.startDate, 'M/d(E)', { locale: ja })} 〜 ${format(weekInfo.endDate, 'M/d(E)', { locale: ja })}`;
}

/** 指定された日付が週の範囲内にあるかどうかを判定する */
export function isInWeek(date: Date, weekInfo: WeekInfo): boolean {
  return isWithinInterval(date, {
    start: weekInfo.startDate,
    end: weekInfo.endDate,
  });
}