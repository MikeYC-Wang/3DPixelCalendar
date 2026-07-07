# 🕹️ 3D Pixel Calendar

繁體中文 | [English](README.en.md) | [日本語](README.ja.md) | 한국어

매일 자동으로 업데이트되는 레트로 픽셀 아트 스타일의 "입체" 달력 SVG입니다. 오늘의 양력 날짜와 음력 날짜를 보여줍니다. 여러 색상 테마, 언어, 시간대를 지원하며, 누구나 자신의 GitHub `README.md`에 바로 삽입할 수 있습니다.

![preview](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar.svg)

## 빠른 삽입

아래 내용을 `README.md`에 복사하세요 (기본값: 아케이드 테마 / 번체 중국어 / 타이베이 시간):

```md
![My pixel calendar](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar.svg)
```

## 색상 / 언어 / 시간대 커스터마이징

이미지 URL 형식은 다음과 같습니다:

```
https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-{color}-{lang}-{tz}.svg
```

`{color}`, `{lang}`, `{tz}`를 아래 표의 코드로 바꿔주세요.

### 색상 (`color`)

| 코드      | 이름    | 미리보기 |
| --------- | ------- | -------- |
| `arcade`  | 아케이드 (기본값) | ![arcade](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-arcade-zh-tpe.svg) |
| `sakura`  | 사쿠라  | ![sakura](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-sakura-zh-tpe.svg) |
| `forest`  | 포레스트 | ![forest](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-forest-zh-tpe.svg) |
| `ocean`   | 오션    | ![ocean](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-ocean-zh-tpe.svg) |
| `sunset`  | 선셋    | ![sunset](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-sunset-zh-tpe.svg) |

### 언어 (`lang`)

> 참고: 이 옵션은 달력 SVG 자체에 표시되는 텍스트 언어(현재 `zh`/`en`만 지원)를 결정하며, 이 문서를 읽고 있는 언어와는 무관합니다.

| 코드 | 설명 |
| ---- | ---- |
| `zh` | 번체 중국어 (기본값, 음력 월/일 표시) |
| `en` | 영어 (음력 날짜를 숫자로 표시, 예: `Lunar 5/23`) |

### 시간대 (`tz`)

| 코드  | 지역 |
| ----- | ---- |
| `tpe` | 타이베이 / 베이징 / 싱가포르 (기본값, UTC+8) |
| `tyo` | 도쿄 / 서울 (UTC+9) |
| `utc` | 그리니치 (UTC+0) |
| `ldn` | 런던 |
| `ber` | 베를린 / 파리 |
| `nyc` | 뉴욕 |
| `lax` | 로스앤젤레스 |
| `kol` | 인도 |
| `syd` | 시드니 |

### 예시

```md
<!-- 포레스트 / 영어 / 도쿄 시간 -->
![calendar](https://raw.githubusercontent.com/MikeYC-Wang/3DPixelCalendar/output/dist/calendar-forest-en-tyo.svg)
```

## 작동 원리

- GitHub Actions 스케줄(매일 UTC 00:05, 12:05)이 [lunar-javascript](https://www.npmjs.com/package/lunar-javascript)를 사용해 양력/음력 날짜를 계산하고, "색상 × 언어 × 시간대"의 모든 조합을 다시 생성합니다.
- 생성된 SVG는 `output` 브랜치의 `dist/` 폴더로 푸시됩니다. `main` 브랜치에는 생성기 소스 코드만 있습니다.
- 날짜는 어느 시점이든 모든 사람에게 동일하므로, 이것은 순수한 정적 이미지이며 서버 없이도 모두가 같은 임베드를 공유할 수 있습니다.

## 로컬 개발

```bash
npm install
npm run build

# 단일 조합 생성
node dist/index.js --output dist/calendar.svg --color arcade --lang zh --tz tpe

# 모든 색상 × 언어 × 시간대 조합을 한 번에 생성
npm run generate:all
```

## 프로젝트 구조

```
src/
  dateInfo.ts     # IANA 시간대 기준 현재 양력 날짜를 읽고 음력으로 변환
  lunarNumerals.ts# 음력 한자 숫자 <-> 아라비아 숫자 변환 (영어 표시용)
  themes.ts       # 5가지 색상 테마
  timezones.ts    # 자주 사용하는 시간대 목록
  i18n.ts         # 중국어/영어 문자열
  pixelFont.ts    # 5x7 도트 매트릭스 픽셀 숫자 폰트 + 입체 베벨 렌더링
  render.ts       # 최종 SVG 조립
  index.ts        # CLI: 단일 SVG 생성
  generateAll.ts  # CLI: 모든 조합 일괄 생성 (CI용)
.github/workflows/generate-calendar.yml  # 매일 자동 생성 및 output 브랜치에 배포
```
