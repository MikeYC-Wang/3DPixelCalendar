export interface TimezonePreset {
  key: string;
  iana: string;
  labelZh: string;
  labelEn: string;
}

/** A curated list of commonly used timezones (IANA identifiers, DST-aware via Intl). */
export const TIMEZONES: Record<string, TimezonePreset> = {
  tpe: { key: "tpe", iana: "Asia/Taipei", labelZh: "台北/北京/新加坡", labelEn: "Taipei/Beijing/Singapore" },
  tyo: { key: "tyo", iana: "Asia/Tokyo", labelZh: "東京/首爾", labelEn: "Tokyo/Seoul" },
  utc: { key: "utc", iana: "Etc/UTC", labelZh: "格林威治", labelEn: "London (UTC)" },
  ldn: { key: "ldn", iana: "Europe/London", labelZh: "倫敦", labelEn: "London" },
  ber: { key: "ber", iana: "Europe/Berlin", labelZh: "柏林/巴黎", labelEn: "Berlin/Paris" },
  nyc: { key: "nyc", iana: "America/New_York", labelZh: "紐約", labelEn: "New York" },
  lax: { key: "lax", iana: "America/Los_Angeles", labelZh: "洛杉磯", labelEn: "Los Angeles" },
  kol: { key: "kol", iana: "Asia/Kolkata", labelZh: "印度", labelEn: "India" },
  syd: { key: "syd", iana: "Australia/Sydney", labelZh: "雪梨", labelEn: "Sydney" },
};

export const DEFAULT_TIMEZONE_KEY = "tpe";
