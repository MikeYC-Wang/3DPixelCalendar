import { Solar } from "lunar-javascript";

export interface LunarInfo {
  yearGanZhi: string;
  yearShengXiao: string;
  monthChinese: string;
  dayChinese: string;
  jieQi: string | null;
  festivals: string[];
}

export interface DateInfo {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  weekdayIndex: number; // 0-6, 0 = Sunday
  isWeekend: boolean;
  utcOffsetLabel: string; // e.g. "UTC+8", "UTC+05:30"
  lunar: LunarInfo | null;
}

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Reads the numeric y/m/d + weekday for "now" as observed in the given IANA timezone. */
function readWallClockParts(ianaTimeZone: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ianaTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(now);

  const lookup: Record<string, string> = {};
  for (const part of parts) lookup[part.type] = part.value;

  const offsetParts = new Intl.DateTimeFormat("en-US", {
    timeZone: ianaTimeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(now);
  const offsetRaw =
    offsetParts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";

  return {
    year: Number(lookup.year),
    month: Number(lookup.month),
    day: Number(lookup.day),
    weekdayIndex: WEEKDAY_SHORT.indexOf(lookup.weekday),
    utcOffsetLabel: offsetRaw.replace("GMT", "UTC"),
  };
}

export function getDateInfo(ianaTimeZone: string): DateInfo {
  const { year, month, day, weekdayIndex, utcOffsetLabel } =
    readWallClockParts(ianaTimeZone);

  let lunar: LunarInfo | null = null;
  try {
    const solar = Solar.fromYmd(year, month, day);
    const l = solar.getLunar();
    const jieQi = l.getJieQi();
    const festivals = [...solar.getFestivals(), ...l.getFestivals()].filter(
      (f): f is string => Boolean(f)
    );
    lunar = {
      yearGanZhi: l.getYearInGanZhi(),
      yearShengXiao: l.getYearShengXiao(),
      monthChinese: l.getMonthInChinese(),
      dayChinese: l.getDayInChinese(),
      jieQi: jieQi ? jieQi : null,
      festivals,
    };
  } catch {
    lunar = null;
  }

  return {
    year,
    month,
    day,
    weekdayIndex,
    isWeekend: weekdayIndex === 0 || weekdayIndex === 6,
    utcOffsetLabel,
    lunar,
  };
}
