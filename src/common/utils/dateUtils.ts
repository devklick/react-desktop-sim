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
