# 🕹️ 3D Pixel Calendar

[English](README.en.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | 繁體中文

一張每天自動更新的復古像素風「立體」日曆 SVG，顯示國曆日期與農曆月日，支援多種配色、語言與時區，任何人都可以直接嵌入自己的 GitHub `README.md`。

![preview](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar.svg)

## 快速嵌入

複製下面的 Markdown 到你的 `README.md`（預設：街機青配色 / 繁體中文 / 台北時間）：

```md
![我的像素日曆](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar.svg)
```

## 自訂配色 / 語言 / 時區

圖片網址的格式如下：

```
https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-{color}-{lang}-{tz}.svg
```

把 `{color}`、`{lang}`、`{tz}` 換成下表對應的代碼即可。

### 配色（`color`）

| 代碼      | 名稱    | 預覽 |
| --------- | ------- | ---- |
| `arcade`  | 街機青（預設） | ![arcade](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-arcade-zh-tpe.svg) |
| `sakura`  | 櫻花粉  | ![sakura](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-sakura-zh-tpe.svg) |
| `forest`  | 森林綠  | ![forest](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-forest-zh-tpe.svg) |
| `ocean`   | 海洋藍  | ![ocean](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-ocean-zh-tpe.svg) |
| `sunset`  | 夕陽橙  | ![sunset](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-sunset-zh-tpe.svg) |

### 語言（`lang`）

| 代碼 | 說明 |
| ---- | ---- |
| `zh` | 繁體中文（預設，含農曆月日） |
| `en` | English（農曆以數字顯示，如 `Lunar 5/23`） |

### 時區（`tz`）

| 代碼  | 地區 |
| ----- | ---- |
| `tpe` | 台北 / 北京 / 新加坡（預設，UTC+8） |
| `tyo` | 東京 / 首爾（UTC+9） |
| `utc` | 格林威治（UTC+0） |
| `ldn` | 倫敦 |
| `ber` | 柏林 / 巴黎 |
| `nyc` | 紐約 |
| `lax` | 洛杉磯 |
| `kol` | 印度 |
| `syd` | 雪梨 |

### 範例

```md
<!-- 森林綠 / 英文 / 東京時間 -->
![calendar](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-forest-en-tyo.svg)
```

## 運作原理

- GitHub Actions 排程（每天 UTC 00:05 與 12:05）自動用 [lunar-javascript](https://www.npmjs.com/package/lunar-javascript) 計算國曆／農曆日期，重新產生所有「配色 × 語言 × 時區」組合的 SVG。
- 產生的 SVG 會被推送到 `output` 分支的 `dist/` 目錄，`main` 分支只放產生器原始碼。
- 日期不因觀看者而異（同一時刻大家看到的是同一天），所以這是純靜態圖片，不需要任何伺服器即可讓所有人共用嵌入。

## 本機開發

```bash
npm install
npm run build

# 產生單一組合
node dist/index.js --output dist/calendar.svg --color arcade --lang zh --tz tpe

# 一次產生所有配色 × 語言 × 時區組合
npm run generate:all
```

## 專案結構

```
src/
  dateInfo.ts     # 依 IANA 時區讀取當下國曆日期，並轉換農曆資訊
  lunarNumerals.ts# 中文農曆數字 <-> 阿拉伯數字轉換（英文版用）
  themes.ts       # 5 組配色主題
  timezones.ts    # 常用時區清單
  i18n.ts         # 中/英文字串
  pixelFont.ts    # 5x7 點陣像素數字字型 + 立體浮雕渲染
  render.ts       # 組出完整 SVG
  index.ts        # CLI：產生單一 SVG
  generateAll.ts  # CLI：批次產生所有組合（CI 用）
.github/workflows/generate-calendar.yml  # 每日自動產生並發布到 output 分支
```

## License

[MIT](LICENSE)
