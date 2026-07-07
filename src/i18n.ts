import { LunarInfo } from "./dateInfo";
import { lunarDayToNumber, lunarMonthToNumber } from "./lunarNumerals";

export type Lang = "zh" | "en";

export interface Strings {
  weekday: string[]; // 0 = Sunday ... 6 = Saturday
  month: string[]; // 0 = January ... 11 = December
  lunarLine(lunar: LunarInfo): string;
  footer(utcOffsetLabel: string): string;
}

const ZH: Strings = {
  weekday: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
  month: [
    "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月",
  ],
  lunarLine: (lunar) => `農曆 ${lunar.monthChinese}月${lunar.dayChinese}`,
  footer: (offset) => `${offset} · 每日自動更新`,
};

const EN: Strings = {
  weekday: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  month: [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ],
  lunarLine: (lunar) => {
    const { month, isLeap } = lunarMonthToNumber(lunar.monthChinese);
    const day = lunarDayToNumber(lunar.dayChinese);
    return `Lunar ${isLeap ? "L" : ""}${month}/${day}`;
  },
  footer: (offset) => `${offset} · AUTO-UPDATED DAILY`,
};

export const STRINGS: Record<Lang, Strings> = { zh: ZH, en: EN };

export const DEFAULT_LANG: Lang = "zh";
