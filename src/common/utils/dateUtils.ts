const MS_PER_DAY = 24 * 60 * 60 * 1000;

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
  locale = "en-US",
  format: "long" | "short" = "short",
) {
  return new Intl.DateTimeFormat(locale, { weekday: format }).format(
    new Date(2021, 0, dayIndex + 3),
  );
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
