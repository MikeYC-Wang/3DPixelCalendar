import { DateInfo } from "./dateInfo";
import { renderDigits } from "./pixelFont";
import { ColorTheme } from "./themes";
import { Lang, STRINGS } from "./i18n";

export interface RenderOptions {
  theme: ColorTheme;
  lang: Lang;
}

const WIDTH = 380;
const HEIGHT = 480;

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Builds a stepped-corner ("pixel cut") rectangle path, retro window-frame style. */
function pixelFramePath(x: number, y: number, w: number, h: number, step: number): string {
  return [
    `M ${x + step},${y}`,
    `L ${x + w - step},${y}`,
    `L ${x + w},${y + step}`,
    `L ${x + w},${y + h - step}`,
    `L ${x + w - step},${y + h}`,
    `L ${x + step},${y + h}`,
    `L ${x},${y + h - step}`,
    `L ${x},${y + step}`,
    "Z",
  ].join(" ");
}

function dashedDivider(x: number, y: number, w: number, color: string): string {
  const dashW = 8;
  const gap = 6;
  let out = "";
  for (let dx = 0; dx < w; dx += dashW + gap) {
    out += `<rect x="${x + dx}" y="${y}" width="${Math.min(dashW, w - dx)}" height="3" fill="${color}"/>`;
  }
  return out;
}

export function renderCalendarSvg(info: DateInfo, options: RenderOptions): string {
  const { theme, lang } = options;
  const strings = STRINGS[lang];
  const isWeekend = info.isWeekend;

  const digitColors = {
    face: isWeekend ? theme.digitFaceWeekend : theme.digitFace,
    light: isWeekend ? theme.digitLightWeekend : theme.digitLight,
    dark: isWeekend ? theme.digitDarkWeekend : theme.digitDark,
  };
  const weekdayColor = isWeekend ? theme.weekend : theme.weekday;
  const weekdayLabel = strings.weekday[info.weekdayIndex];
  const monthLabel = strings.month[info.month - 1];

  const dayStr = String(info.day).padStart(2, "0");
  const cell = 22;
  const gap = 14;
  const digitsWidth = dayStr.length * 5 * cell + (dayStr.length - 1) * gap;
  const digits = renderDigits(
    dayStr,
    (WIDTH - digitsWidth) / 2,
    150,
    cell,
    digitColors,
    gap
  );

  let lunarBlock = "";
  if (info.lunar) {
    const lunar = info.lunar;
    lunarBlock = `
      <text x="${WIDTH / 2}" y="398" text-anchor="middle" font-family="'Segoe UI', 'Microsoft JhengHei', sans-serif" font-size="20" font-weight="700" fill="${theme.textPrimary}">${escapeXml(strings.lunarLine(lunar))}</text>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="${theme.bg}"/>
      <rect width="1" height="16" fill="${theme.gridLine}" opacity="0.03"/>
      <rect width="16" height="1" fill="${theme.gridLine}" opacity="0.03"/>
    </pattern>
  </defs>

  <path d="${pixelFramePath(0, 0, WIDTH, HEIGHT, 18)}" fill="${theme.border}"/>
  <path d="${pixelFramePath(6, 6, WIDTH - 12, HEIGHT - 12, 14)}" fill="url(#grid)"/>

  <!-- header -->
  <path d="${pixelFramePath(24, 24, 78, 30, 6)}" fill="${weekdayColor}"/>
  <text x="63" y="44" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="15" font-weight="700" fill="${theme.bg}">${escapeXml(weekdayLabel)}</text>

  <text x="${WIDTH - 24}" y="44" text-anchor="end" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" fill="${theme.textSecondary}">${info.year}</text>

  <text x="${WIDTH / 2}" y="90" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="700" letter-spacing="6" fill="${theme.textSecondary}">${escapeXml(monthLabel)}</text>

  <!-- hero day-of-month, rendered as beveled pixel blocks -->
  ${digits.svg}

  ${dashedDivider(24, 330, WIDTH - 48, theme.divider)}

  <!-- lunar calendar info -->
  ${lunarBlock}

  <!-- footer -->
  ${dashedDivider(24, HEIGHT - 46, WIDTH - 48, theme.divider)}
  <text x="${WIDTH / 2}" y="${HEIGHT - 22}" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12" letter-spacing="1" fill="${theme.textSecondary}">${escapeXml(strings.footer(info.utcOffsetLabel))}</text>
</svg>`;
}
