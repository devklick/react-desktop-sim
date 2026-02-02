import { useCallback, useEffect, useState } from "react";
import { isToday, startOfDay } from "../../../common/utils/dateUtils";

interface CalendarDay {
  isToday: boolean;
  isThisMonth: boolean;
  date: Date;
}

export function useCalendar() {
  const [cursor, setCursor] = useState(startOfDay(new Date()));

  const nextDay = () =>
    setCursor((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1));

  const prevDay = () =>
    setCursor((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1));

  const nextMonth = () =>
    setCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()));

  const prevMonth = () =>
    setCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()));

  const nextYear = () =>
    setCursor((d) => new Date(d.getFullYear() + 1, d.getMonth(), d.getDate()));

  const prevYear = () =>
    setCursor((d) => new Date(d.getFullYear() - 1, d.getMonth(), d.getDate()));

  const getCalendarDays = useCallback(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 0).getDay(); // 0 - 6
    const calendarCellCount = 7 * 6; // 7 cols (1 per day), 6 rows
    const startOfToday = startOfDay(new Date());

    const days: CalendarDay[] = [];

    for (let i = 0; i < calendarCellCount; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const today = isToday(year, month, dayNumber, startOfToday);
      const date = startOfDay(
        new Date(cursor.getFullYear(), cursor.getMonth(), dayNumber),
      );

      const isThisMonth = dayNumber >= 1 && dayNumber <= daysInMonth;
      days.push({ date, isToday: today, isThisMonth });
    }
    return days;
  }, [cursor]);

  const [days, setDays] = useState<Array<CalendarDay>>(getCalendarDays);

  useEffect(() => setDays(getCalendarDays), [cursor, getCalendarDays]);

  return {
    prevDay,
    nextDay,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    days,
    setCursor,
    cursor,
  };
}
