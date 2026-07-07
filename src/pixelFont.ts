/**
 * Tiny 5x7 dot-matrix bitmap font for digits 0-9, used to render the big
 * "hero" date number as chunky, beveled 3D pixel blocks.
 * Each string row is 5 chars wide; '1' = filled pixel, '0' = empty.
 */
const DIGITS: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "11100"],
};

export const DIGIT_COLS = 5;
export const DIGIT_ROWS = 7;

export interface PixelColors {
  face: string;
  light: string;
  dark: string;
}

/**
 * Renders a single digit character as a group of beveled "voxel" pixel cubes.
 * Each on-bit is drawn as a flat square face plus thin highlight/shadow
 * strips on two edges, giving a raised 3D block look without needing a
 * full isometric transform.
 */
export function renderDigit(
  digit: string,
  originX: number,
  originY: number,
  cell: number,
  colors: PixelColors
): string {
  const pattern = DIGITS[digit];
  if (!pattern) return "";
  const bevel = Math.max(1, Math.round(cell * 0.16));
  let out = "";
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      if (pattern[row][col] !== "1") continue;
      const x = originX + col * cell;
      const y = originY + row * cell;
      out += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${colors.face}"/>`;
      out += `<rect x="${x}" y="${y}" width="${cell}" height="${bevel}" fill="${colors.light}"/>`;
      out += `<rect x="${x}" y="${y}" width="${bevel}" height="${cell}" fill="${colors.light}"/>`;
      out += `<rect x="${x}" y="${y + cell - bevel}" width="${cell}" height="${bevel}" fill="${colors.dark}"/>`;
      out += `<rect x="${x + cell - bevel}" y="${y}" width="${bevel}" height="${cell}" fill="${colors.dark}"/>`;
    }
  }
  return out;
}

/** Renders a multi-digit string (e.g. day-of-month or year) side by side. */
export function renderDigits(
  text: string,
  originX: number,
  originY: number,
  cell: number,
  colors: PixelColors,
  gap: number
): { svg: string; width: number } {
  let svg = "";
  let x = originX;
  const digitWidth = DIGIT_COLS * cell;
  for (const ch of text) {
    svg += renderDigit(ch, x, originY, cell, colors);
    x += digitWidth + gap;
  }
  return { svg, width: x - gap - originX };
}
