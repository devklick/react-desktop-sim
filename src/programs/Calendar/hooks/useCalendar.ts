import { useCallback, useEffect, useState } from "react";
import { getDayName, isToday } from "../../../common/utils/dateUtils";

interface CalendarDay {
  date: number;
  day: string;
  isToday: boolean;
  isThisMonth: boolean;
}
export function useCalendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const prevYear = () => setYear((x) => x - 1);
  const nextYear = () => setYear((x) => x + 1);
  const wrapMonth = (m: number) => ((m % 12) + 12) % 12;
  const nextMonth = () => setMonth((x) => wrapMonth(x + 1));
  const prevMonth = () => setMonth((x) => wrapMonth(x - 1));

  const getCalendarDays = useCallback(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 0).getDay(); // 0 - 6
    const calendarCellCount = 7 * 6; // 7 cols (1 per day), 6 rows
    const date = new Date();

    const days: CalendarDay[] = [];

    for (let i = 0; i < calendarCellCount; i++) {
      let dayNumber = i - firstDayOfMonth + 1;
      const cellDayName = getDayName(i + 1);
      const today = isToday(year, month, dayNumber, date);

      if (dayNumber < 1 || dayNumber > daysInMonth) {
        dayNumber = new Date(year, month, dayNumber).getDate();
        // Empty cell
        days.push({
          date: dayNumber,
          day: cellDayName,
          isToday: today,
          isThisMonth: false,
        });
      } else {
        // Valid day
        days.push({
          date: dayNumber,
          day: cellDayName,
          isToday: today,
          isThisMonth: true,
        });
      }
    }
    return days;
  }, [month, year]);

  const [days, setDays] = useState<Array<CalendarDay>>(getCalendarDays);

  useEffect(() => setDays(getCalendarDays), [year, month, getCalendarDays]);

  return {
    year,
    month,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    days,
  };
}
