# 🕹️ 3D Pixel Calendar

[繁體中文](README.md) | English | [日本語](README.ja.md) | [한국어](README.ko.md)

A daily auto-updating, retro pixel-art "3D" calendar SVG that shows today's Gregorian date and Lunar (Chinese calendar) date. Supports multiple color themes, languages, and timezones — anyone can embed it directly in their own GitHub `README.md`.

![preview](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar.svg)

## Quick embed

Copy this into your `README.md` (default: Arcade theme / Traditional Chinese / Taipei time):

```md
![My pixel calendar](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar.svg)
```

## Customize color / language / timezone

The image URL follows this pattern:

```
https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-{color}-{lang}-{tz}.svg
```

Replace `{color}`, `{lang}`, `{tz}` with the codes from the tables below.

### Color (`color`)

| Code      | Name    | Preview |
| --------- | ------- | ------- |
| `arcade`  | Arcade (default) | ![arcade](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-arcade-zh-tpe.svg) |
| `sakura`  | Sakura  | ![sakura](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-sakura-zh-tpe.svg) |
| `forest`  | Forest  | ![forest](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-forest-zh-tpe.svg) |
| `ocean`   | Ocean   | ![ocean](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-ocean-zh-tpe.svg) |
| `sunset`  | Sunset  | ![sunset](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-sunset-zh-tpe.svg) |

### Language (`lang`)

> Note: this only controls the text baked into the calendar SVG itself (currently `zh`/`en`). It's independent from which language you're reading this documentation in.

| Code | Description |
| ---- | ----------- |
| `zh` | Traditional Chinese (default, shows the Lunar month/day) |
| `en` | English (Lunar date shown as numbers, e.g. `Lunar 5/23`) |

### Timezone (`tz`)

| Code  | Region |
| ----- | ------ |
| `tpe` | Taipei / Beijing / Singapore (default, UTC+8) |
| `tyo` | Tokyo / Seoul (UTC+9) |
| `utc` | Greenwich (UTC+0) |
| `ldn` | London |
| `ber` | Berlin / Paris |
| `nyc` | New York |
| `lax` | Los Angeles |
| `kol` | India |
| `syd` | Sydney |

### Example

```md
<!-- Forest / English / Tokyo time -->
![calendar](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-forest-en-tyo.svg)
```

## How it works

- A GitHub Actions schedule (daily at UTC 00:05 and 12:05) uses [lunar-javascript](https://www.npmjs.com/package/lunar-javascript) to compute the Gregorian/Lunar date and regenerates every "color × language × timezone" combination.
- The generated SVGs are pushed to the `dist/` folder of the `output` branch; the `main` branch only holds the generator source code.
- The date is the same for every viewer at any given moment, so this is a purely static image — no server required for everyone to share the same embed.

## Local development

```bash
npm install
npm run build

# Generate a single combination
node dist/index.js --output dist/calendar.svg --color arcade --lang zh --tz tpe

# Generate every color × language × timezone combination at once
npm run generate:all
```

## Project structure

```
src/
  dateInfo.ts     # Reads the current Gregorian date for an IANA timezone, converts to Lunar
  lunarNumerals.ts# Chinese lunar numerals <-> Arabic numbers (used by the English rendering)
  themes.ts       # 5 color theme presets
  timezones.ts    # Curated list of common timezones
  i18n.ts         # Chinese/English strings
  pixelFont.ts    # 5x7 dot-matrix pixel digit font + beveled 3D rendering
  render.ts       # Assembles the final SVG
  index.ts        # CLI: generate a single SVG
  generateAll.ts  # CLI: batch-generate every combination (used by CI)
.github/workflows/generate-calendar.yml  # Daily generation + publish to the output branch
```

## License

[MIT](LICENSE)
