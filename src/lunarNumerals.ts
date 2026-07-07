/**
 * Converts the Chinese lunar month/day labels returned by lunar-javascript
 * (e.g. "六", "闰六", "廿三") into plain numbers, for use in the English
 * rendering of the calendar (e.g. "Lunar 6/23").
 */

const MONTH_NAMES = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];

const DAY_NAMES = [
  "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十",
];

export function lunarMonthToNumber(monthChinese: string): { month: number; isLeap: boolean } {
  const isLeap = monthChinese.startsWith("闰");
  const name = isLeap ? monthChinese.slice(1) : monthChinese;
  const index = MONTH_NAMES.indexOf(name);
  return { month: index === -1 ? 0 : index + 1, isLeap };
}

export function lunarDayToNumber(dayChinese: string): number {
  const index = DAY_NAMES.indexOf(dayChinese);
  return index === -1 ? 0 : index + 1;
}
