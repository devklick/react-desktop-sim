import { forwardRef, useImperativeHandle, useRef } from "react";
import useToggle from "../../hooks/useToggle";
import {
  StyledCalendarDays,
  StyledCalendarDaysFrame,
  StyledCalendarLayout,
} from "./styles";
import useSystemSettings from "../../stores/systemSettingsStore";
import { BorderedAppContentHandles } from "../../components/BorderedApp/BorderedApp";
import CalendarNavigation from "./CalendarNavigation/CalendarNavigation";
import { useCalendar } from "./hooks/useCalendar";
import CalendarSidebar from "./CalendarSidebar/CalendarSidebar";
import CalendarDay from "./CalendarDay/CalendarDay";

type CalendarHandles = BorderedAppContentHandles<HTMLDivElement>;

interface CalendarProps {}

const Calendar = forwardRef<CalendarHandles, CalendarProps>((_props, ref) => {
  const sidebarToggle = useToggle();
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendar = useCalendar();
  const [accentColor] = useSystemSettings((s) => [s.accentColor]);

  useImperativeHandle(ref, () => ({
    element: calendarRef.current,
  }));

  return (
    <StyledCalendarLayout
      ref={calendarRef}
      sidebarOpen={sidebarToggle.state}
      className="calendar"
    >
      <CalendarNavigation
        month={calendar.cursor.getMonth()}
        year={calendar.cursor.getFullYear()}
        onClickNextMonth={calendar.nextMonth}
        onClickNextYear={calendar.nextYear}
        onClickPrevMonth={calendar.prevMonth}
        onClickPrevYear={calendar.prevYear}
      />
      <CalendarSidebar date={calendar.cursor} />
      <StyledCalendarDaysFrame frameColor={accentColor}>
        <StyledCalendarDays
          borderColor={accentColor}
          className="calendar__days"
        >
          {calendar.days.map((day) => (
            <CalendarDay
              date={day.date}
              isThisMonth={day.isThisMonth}
              isToday={day.isToday}
              onClick={() => calendar.setCursor(day.date)}
              key={day.date.toISOString()}
            />
          ))}
        </StyledCalendarDays>
      </StyledCalendarDaysFrame>
    </StyledCalendarLayout>
  );
});

export default Calendar;
