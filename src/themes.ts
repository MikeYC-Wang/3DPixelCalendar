export interface ColorTheme {
  key: string;
  nameZh: string;
  nameEn: string;
  bg: string;
  gridLine: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  weekday: string;
  weekend: string;
  digitFace: string;
  digitLight: string;
  digitDark: string;
  digitFaceWeekend: string;
  digitLightWeekend: string;
  digitDarkWeekend: string;
  divider: string;
}

export const THEMES: Record<string, ColorTheme> = {
  arcade: {
    key: "arcade",
    nameZh: "街機青",
    nameEn: "Arcade",
    bg: "#12142b",
    gridLine: "#ffffff",
    border: "#4fd1c5",
    textPrimary: "#f5f6fa",
    textSecondary: "#9a9dc4",
    weekday: "#7ee8fa",
    weekend: "#ff6b81",
    digitFace: "#ffd166",
    digitLight: "#fff4d6",
    digitDark: "#b8862e",
    digitFaceWeekend: "#ff8fa3",
    digitLightWeekend: "#ffd6dd",
    digitDarkWeekend: "#b23a52",
    divider: "#33366b",
  },
  sakura: {
    key: "sakura",
    nameZh: "櫻花粉",
    nameEn: "Sakura",
    bg: "#2b1a26",
    gridLine: "#ffffff",
    border: "#ff9ec4",
    textPrimary: "#fdf0f6",
    textSecondary: "#c99bb3",
    weekday: "#ffc2de",
    weekend: "#ff5d8f",
    digitFace: "#ff8fb3",
    digitLight: "#ffd9e6",
    digitDark: "#b34d70",
    digitFaceWeekend: "#ff4f7e",
    digitLightWeekend: "#ffc2d6",
    digitDarkWeekend: "#8f2e4e",
    divider: "#4d3140",
  },
  forest: {
    key: "forest",
    nameZh: "森林綠",
    nameEn: "Forest",
    bg: "#122016",
    gridLine: "#ffffff",
    border: "#6fcf97",
    textPrimary: "#f1faf4",
    textSecondary: "#9bc4a8",
    weekday: "#a6e3a1",
    weekend: "#f2c94c",
    digitFace: "#8ee6a5",
    digitLight: "#dbfbe3",
    digitDark: "#3f9e5f",
    digitFaceWeekend: "#f2c94c",
    digitLightWeekend: "#fbe9b0",
    digitDarkWeekend: "#a8821f",
    divider: "#254230",
  },
  ocean: {
    key: "ocean",
    nameZh: "海洋藍",
    nameEn: "Ocean",
    bg: "#0d1b2a",
    gridLine: "#ffffff",
    border: "#4da8ff",
    textPrimary: "#eef6ff",
    textSecondary: "#8fb3d9",
    weekday: "#7fd8ff",
    weekend: "#ffb26b",
    digitFace: "#5bc0ff",
    digitLight: "#cfefff",
    digitDark: "#2b6e99",
    digitFaceWeekend: "#ffb26b",
    digitLightWeekend: "#ffe1bf",
    digitDarkWeekend: "#a9691f",
    divider: "#1e3a54",
  },
  sunset: {
    key: "sunset",
    nameZh: "夕陽橙",
    nameEn: "Sunset",
    bg: "#241222",
    gridLine: "#ffffff",
    border: "#ff8a5c",
    textPrimary: "#fff2eb",
    textSecondary: "#cf9fb8",
    weekday: "#ffab73",
    weekend: "#c084fc",
    digitFace: "#ff8a5c",
    digitLight: "#ffd7c2",
    digitDark: "#a84e2c",
    digitFaceWeekend: "#c084fc",
    digitLightWeekend: "#e9d1ff",
    digitDarkWeekend: "#7a4bab",
    divider: "#3b2140",
  },
};

export const DEFAULT_THEME_KEY = "arcade";
