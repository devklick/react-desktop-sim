import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import useToggle from "../../hooks/useToggle";
import {
  StyledCalendarDay,
  StyledCalendarDays,
  StyledCalendarDaysFrame,
  StyledCalendarLayout,
} from "./styles";
import useSystemSettings from "../../stores/systemSettingsStore";
import { BorderedAppContentHandles } from "../../components/BorderedApp/BorderedApp";
import CalendarNavigation from "./CalendarNavigation/CalendarNavigation";
import { useCalendar } from "./hooks/useCalendar";

type CalendarHandles = BorderedAppContentHandles<HTMLDivElement>;

interface CalendarProps {}

const Calendar = forwardRef<CalendarHandles, CalendarProps>((_props, ref) => {
  const sidebarToggle = useToggle();
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendar = useCalendar();
  const [mainColor, accentColor, fontColor] = useSystemSettings((s) => [
    s.mainColor,
    s.accentColor,
    s.fontColor,
  ]);

  useImperativeHandle(ref, () => ({
    onParentKeyDown() {},
    element: calendarRef.current,
  }));

  useEffect(() => {
    console.log("sidebar toggle", sidebarToggle.state);
  }, [sidebarToggle.state]);

  useEffect(() => {
    if (!calendarRef.current) return;
    const el = calendarRef.current;

    function onResize(entries: ResizeObserverEntry[]) {
      const entry = entries[0];
      if (!entry) return;

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

  return (
    <StyledCalendarLayout
      ref={calendarRef}
      sidebarOpen={sidebarToggle.state}
      className="calendar"
    >
      <CalendarNavigation
        month={calendar.month}
        year={calendar.year}
        onClickNextMonth={calendar.nextMonth}
        onClickNextYear={calendar.nextYear}
        onClickPrevMonth={calendar.prevMonth}
        onClickPrevYear={calendar.prevYear}
      />
      <StyledCalendarDaysFrame frameColor={accentColor}>
        <StyledCalendarDays
          borderColor={accentColor}
          className="calendar__days"
        >
          {calendar.days.map(({ date, day, isToday, isThisMonth }) => (
            <StyledCalendarDay
              backgroundColor={mainColor}
              color={fontColor}
              currentMonth={isThisMonth}
            >
              <span>{day}</span>
              <span>{date}</span>
              {isToday && <span>TODAY</span>}
            </StyledCalendarDay>
          ))}
        </StyledCalendarDays>
      </StyledCalendarDaysFrame>
    </StyledCalendarLayout>
  );
});

export default Calendar;
