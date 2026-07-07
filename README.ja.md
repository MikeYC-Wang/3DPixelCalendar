# 🕹️ 3D Pixel Calendar

[繁體中文](README.md) | [English](README.en.md) | 日本語 | [한국어](README.ko.md)


毎日自動更新されるレトロなピクセルアート風「立体」カレンダー SVG です。今日の新暦の日付と旧暦（農暦）の日付を表示します。複数のカラーテーマ・言語・タイムゾーンに対応しており、誰でも自分の GitHub `README.md` に直接埋め込めます。

![preview](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar.svg)

## クイック埋め込み

以下を `README.md` にコピーしてください（デフォルト：アーケードテーマ / 繁体字中国語 / 台北時間）：

```md
![My pixel calendar](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar.svg)
```

## カラー / 言語 / タイムゾーンのカスタマイズ

画像 URL は次の形式になっています：

```
https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-{color}-{lang}-{tz}.svg
```

`{color}`、`{lang}`、`{tz}` を下の表のコードに置き換えてください。

### カラー（`color`）

| コード    | 名前    | プレビュー |
| --------- | ------- | ---------- |
| `arcade`  | アーケード（デフォルト） | ![arcade](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-arcade-zh-tpe.svg) |
| `sakura`  | サクラ  | ![sakura](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-sakura-zh-tpe.svg) |
| `forest`  | フォレスト | ![forest](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-forest-zh-tpe.svg) |
| `ocean`   | オーシャン | ![ocean](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-ocean-zh-tpe.svg) |
| `sunset`  | サンセット | ![sunset](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-sunset-zh-tpe.svg) |

### 言語（`lang`）

> ※ これはカレンダー SVG 自体に埋め込まれるテキストの言語（現在は `zh`／`en` のみ）を切り替えるものです。この README を読んでいる言語とは関係ありません。

| コード | 説明 |
| ------ | ---- |
| `zh`   | 繁体字中国語（デフォルト、旧暦の月日を表示） |
| `en`   | 英語（旧暦は数字表示、例：`Lunar 5/23`） |

### タイムゾーン（`tz`）

| コード | 地域 |
| ------ | ---- |
| `tpe`  | 台北／北京／シンガポール（デフォルト、UTC+8） |
| `tyo`  | 東京／ソウル（UTC+9） |
| `utc`  | グリニッジ（UTC+0） |
| `ldn`  | ロンドン |
| `ber`  | ベルリン／パリ |
| `nyc`  | ニューヨーク |
| `lax`  | ロサンゼルス |
| `kol`  | インド |
| `syd`  | シドニー |

### 例

```md
<!-- フォレスト / 英語 / 東京時間 -->
![calendar](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-forest-en-tyo.svg)
```

## 仕組み

- GitHub Actions のスケジュール実行（毎日 UTC 00:05 と 12:05）が [lunar-javascript](https://www.npmjs.com/package/lunar-javascript) を使って新暦／旧暦の日付を計算し、「カラー × 言語 × タイムゾーン」のすべての組み合わせを再生成します。
- 生成された SVG は `output` ブランチの `dist/` フォルダーにプッシュされます。`main` ブランチにはジェネレーターのソースコードのみが置かれます。
- 日付はどの瞬間でも全員に共通なので、これは完全な静的画像であり、みんなが同じ埋め込みを共有するのにサーバーは不要です。

## ローカル開発

```bash
npm install
npm run build

# 単一の組み合わせを生成
node dist/index.js --output dist/calendar.svg --color arcade --lang zh --tz tpe

# すべてのカラー × 言語 × タイムゾーンの組み合わせを一括生成
npm run generate:all
```

## プロジェクト構成

```
src/
  dateInfo.ts     # IANA タイムゾーンで現在の新暦日付を取得し、旧暦に変換
  lunarNumerals.ts# 漢数字（旧暦）<-> 算用数字の変換（英語表示用）
  themes.ts       # 5種類のカラーテーマ
  timezones.ts    # よく使われるタイムゾーンの一覧
  i18n.ts         # 中国語／英語の文字列
  pixelFont.ts    # 5x7 ドットマトリクスのピクセル数字フォント + 立体的なベベル描画
  render.ts       # SVG 全体を組み立てる
  index.ts        # CLI：単一の SVG を生成
  generateAll.ts  # CLI：すべての組み合わせを一括生成（CI用）
.github/workflows/generate-calendar.yml  # 毎日自動生成して output ブランチに公開
```
