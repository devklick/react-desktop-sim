// import useCalendarEvents from "../hooks/useCalendarEvents";
import { useRef } from "react";
import CalendarTimeSlot from "../CalendarTimeSlot/CalendarTimeSlot";
import { StyledCalendarSidebar, StyledDayBreak } from "./styles";
import useSystemSettings from "../../../stores/systemSettingsStore";

interface CalendarSidebarProps {
  date: Date;
  prevDay(): void;
  nextDay(): void;
}

// eslint-disable-next-line no-empty-pattern
export default function CalendarSidebar({}: CalendarSidebarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [breakColor] = useSystemSettings((s) => [s.secondaryColor]);
  return (
    <StyledCalendarSidebar className="calendar__side-bar" ref={ref}>
      {Array.from({ length: 25 }).map((_, i) => (
        <>
          <CalendarTimeSlot hour={i} />
          {i < 24 && <StyledDayBreak color={breakColor} />}
        </>
      ))}
    </StyledCalendarSidebar>
  );
}
