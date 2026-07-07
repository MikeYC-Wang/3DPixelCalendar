import * as fs from "fs";
import * as path from "path";
import { getDateInfo } from "./dateInfo";
import { renderCalendarSvg } from "./render";
import { THEMES, DEFAULT_THEME_KEY } from "./themes";
import { TIMEZONES, DEFAULT_TIMEZONE_KEY } from "./timezones";
import { Lang } from "./i18n";

const LANGS: Lang[] = ["zh", "en"];
const OUTPUT_DIR = path.resolve(process.cwd(), "dist");

function main(): void {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Cache date/lunar info per timezone (shared across color themes and languages).
  const infoByTimezone = new Map(
    Object.values(TIMEZONES).map((tz) => [tz.key, getDateInfo(tz.iana)])
  );

  let count = 0;
  for (const theme of Object.values(THEMES)) {
    for (const lang of LANGS) {
      for (const tz of Object.values(TIMEZONES)) {
        const info = infoByTimezone.get(tz.key)!;
        const svg = renderCalendarSvg(info, { theme, lang });
        const filename = `calendar-${theme.key}-${lang}-${tz.key}.svg`;
        fs.writeFileSync(path.join(OUTPUT_DIR, filename), svg, "utf-8");
        count++;
      }
    }
  }

  // Convenience default alias (Arcade theme, Chinese, Taipei time) for a
  // no-parameters quick-start embed.
  const defaultInfo = infoByTimezone.get(DEFAULT_TIMEZONE_KEY)!;
  const defaultSvg = renderCalendarSvg(defaultInfo, {
    theme: THEMES[DEFAULT_THEME_KEY],
    lang: "zh",
  });
  fs.writeFileSync(path.join(OUTPUT_DIR, "calendar.svg"), defaultSvg, "utf-8");

  console.log(`Generated ${count} calendar SVG variants + 1 default alias in ${OUTPUT_DIR}`);
}

main();
