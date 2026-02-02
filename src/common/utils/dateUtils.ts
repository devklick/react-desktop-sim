const MS_PER_DAY = 24 * 60 * 60 * 1000;

const ordinalSuffixes = {
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
  many: "th",
  zero: "th",
} as const satisfies Record<Intl.LDMLPluralRule, string>;

export function getMonthName(
  monthIndex: number,
  locale = "en-US",
  format: "long" | "short" = "long",
) {
  return new Intl.DateTimeFormat(locale, { month: format }).format(
    new Date(2021, monthIndex, 1),
  );
}

export function getDayName(
  dayIndex: number,
  locale?: "en-US",
  format?: "long" | "short",
): string;
export function getDayName(
  dayIndex: Date,
  locale?: "en-US",
  format?: "long" | "short",
): string;
export function getDayName(
  d: number | Date,
  locale = "en-US",
  format: "long" | "short" = "short",
) {
  const dayIndex = typeof d === "number" ? d : d.getDay();
  return new Intl.DateTimeFormat(locale, { weekday: format }).format(
    new Date(2021, 0, dayIndex + 3),
  );
}

export function getDateOrdinal(
  dateOfMonth: number,
  locale?: Intl.UnicodeBCP47LocaleIdentifier,
): string;
export function getDateOrdinal(
  date: Date,
  locale?: Intl.UnicodeBCP47LocaleIdentifier,
): string;
export function getDateOrdinal(
  date: Date | number,
  locale: Intl.UnicodeBCP47LocaleIdentifier = "en-US",
): string {
  const ordinalPlurals = new Intl.PluralRules(locale, { type: "ordinal" });

  const d = typeof date === "number" ? date : date.getDate();
  return `${d}${ordinalSuffixes[ordinalPlurals.select(d)]}`;
}

export function isToday(
  year: number,
  month: number,
  day: number,
  today: Date = new Date(),
) {
  return (
    year === today.getFullYear() &&
    month === today.getMonth() &&
    day === today.getDate()
  );
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return startOfDayUTC(date1) === startOfDayUTC(date2);
}

export function startOfDay(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0,
  );
}

export function startOfDayUTC(date: Date) {
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0,
  );
}

export function diffBetweenDates(start: Date, end: Date) {
  const startOfEarlier = startOfDay(start);
  const startOfEnd = startOfDay(end);

  const utcEarlier = startOfDayUTC(startOfEarlier);
  const utcLater = startOfDayUTC(startOfEnd);

  return Math.round((utcLater - utcEarlier) / MS_PER_DAY);
}

export function toLocalISODateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getSpannedDays(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  let cursor = startOfDay(start);

  while (cursor < end) {
    days.push(cursor);
    cursor = new Date(
      cursor.getFullYear(),
      cursor.getMonth(),
      cursor.getDate() + 1,
    );
  }

  return days;
}
