import React, { useEffect, useRef, useState } from "react";
import useToggle from "../../hooks/useToggle";
import {
  StyledCalendarDay,
  StyledCalendarDays,
  StyledCalendarDaysFrame,
  StyledCalendarLayout,
  StyledCalendarNavigation,
  StyledCalendarNavigationSection,
  StyledNavigationButton,
} from "./styles";
import useSystemSettings from "../../stores/systemSettingsStore";

interface CalendarProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Calendar(_props: CalendarProps) {
  const sidebarToggle = useToggle();
  const calendarRef = useRef<HTMLDivElement>(null);
  const [mainColor, accentColor, fontColor] = useSystemSettings((s) => [
    s.mainColor,
    s.accentColor,
    s.fontColor,
  ]);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const prevYear = () => setYear((x) => x - 1);
  const nextYear = () => setYear((x) => x + 1);
  const wrapMonth = (m: number) => ((m % 12) + 12) % 12;
  const nextMonth = () => setMonth((x) => wrapMonth(x + 1));
  const prevMonth = () => setMonth((x) => wrapMonth(x - 1));

  useEffect(() => {
    console.log("sidebar toggle", sidebarToggle.state);
  }, [sidebarToggle.state]);

  useEffect(() => {
    if (!calendarRef.current) return;
    const el = calendarRef.current;

    function onResize(entries: ResizeObserverEntry[]) {
      const entry = entries[0];
      if (!entry) return;

      // Most reliable in modern browsers
      const width = entry.contentRect.width;

      const wide = width >= 600;
      sidebarToggle.setState(wide);
    }

    const observer = new ResizeObserver(onResize);

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  });

  const dayName = (
    dayIndex: number,
    locale = "en-US",
    format: "long" | "short" = "short",
  ) =>
    new Intl.DateTimeFormat(locale, { weekday: format }).format(
      new Date(2021, 0, dayIndex + 3),
    );
  const monthName = (
    monthIndex: number,
    locale = "en-US",
    format: "long" | "short" = "long",
  ) =>
    new Intl.DateTimeFormat(locale, { month: format }).format(
      new Date(2021, monthIndex, 1),
    );

  const buildGrid = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 0).getDay(); // 0 - 6
    const calendarCellCount = 7 * 6; // 7 cols (1 per day), 6 rows

    const elements: React.ReactNode[] = [];

    for (let i = 0; i < calendarCellCount; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const cellDayName = dayName(i + 1);

      if (dayNumber < 1 || dayNumber > daysInMonth) {
        // Empty cell
        elements.push(
          <StyledCalendarDay
            backgroundColor={mainColor}
            color={fontColor}
            key={i}
            currentMonth={false}
          >
            {cellDayName}
          </StyledCalendarDay>,
        );
      } else {
        // Valid day
        elements.push(
          <StyledCalendarDay
            backgroundColor={mainColor}
            color={fontColor}
            key={i}
            currentMonth
          >
            <span>{cellDayName}</span>
            <span>{dayNumber}</span>
          </StyledCalendarDay>,
        );
      }
    }
    return elements;
  };

  return (
    <StyledCalendarLayout
      ref={calendarRef}
      sidebarOpen={sidebarToggle.state}
      className="calendar"
    >
      <StyledCalendarNavigation className="calendar__nav">
        <StyledCalendarNavigationSection>
          <StyledNavigationButton
            className="calendar__nav-button"
            onClick={prevMonth}
          >{`<`}</StyledNavigationButton>
          <StyledNavigationButton className="calendar__nav-button">
            {monthName(month)}
          </StyledNavigationButton>
          <StyledNavigationButton
            className="calendar__nav-button"
            onClick={nextMonth}
          >{`>`}</StyledNavigationButton>
        </StyledCalendarNavigationSection>

        <StyledCalendarNavigationSection>
          <StyledNavigationButton
            className="calendar__nav-button"
            onClick={prevYear}
          >{`<`}</StyledNavigationButton>
          <StyledNavigationButton className="calendar__nav-button">
            {year}
          </StyledNavigationButton>
          <StyledNavigationButton
            className="calendar__nav-button"
            onClick={nextYear}
          >{`>`}</StyledNavigationButton>
        </StyledCalendarNavigationSection>
      </StyledCalendarNavigation>
      <StyledCalendarDaysFrame frameColor={accentColor}>
        <StyledCalendarDays
          borderColor={accentColor}
          className="calendar__days"
        >
          {buildGrid()}
        </StyledCalendarDays>
      </StyledCalendarDaysFrame>
    </StyledCalendarLayout>
  );
}

export default Calendar;
