import * as fs from "fs";
import * as path from "path";
import { getDateInfo } from "./dateInfo";
import { renderCalendarSvg } from "./render";
import { THEMES, DEFAULT_THEME_KEY } from "./themes";
import { TIMEZONES, DEFAULT_TIMEZONE_KEY } from "./timezones";
import { Lang, DEFAULT_LANG } from "./i18n";

function parseArgs(argv: string[]): {
  output: string;
  color: string;
  lang: Lang;
  tz: string;
} {
  let output = "dist/calendar.svg";
  let color = DEFAULT_THEME_KEY;
  let lang: Lang = DEFAULT_LANG;
  let tz = DEFAULT_TIMEZONE_KEY;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--output" && argv[i + 1]) {
      output = argv[i + 1];
      i++;
    } else if (argv[i] === "--color" && argv[i + 1]) {
      color = argv[i + 1];
      i++;
    } else if (argv[i] === "--lang" && argv[i + 1]) {
      const value = argv[i + 1];
      if (value === "zh" || value === "en") lang = value;
      i++;
    } else if (argv[i] === "--tz" && argv[i + 1]) {
      tz = argv[i + 1];
      i++;
    }
  }
  return { output, color, lang, tz };
}

function main(): void {
  const { output, color, lang, tz } = parseArgs(process.argv.slice(2));

  const theme = THEMES[color];
  if (!theme) throw new Error(`Unknown color theme: ${color}`);
  const timezone = TIMEZONES[tz];
  if (!timezone) throw new Error(`Unknown timezone preset: ${tz}`);

  const info = getDateInfo(timezone.iana);
  const svg = renderCalendarSvg(info, { theme, lang });

  const outputPath = path.resolve(process.cwd(), output);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, svg, "utf-8");
  console.log(`Calendar SVG written to ${outputPath}`);
}

main();
