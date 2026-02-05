// import useCalendarEvents from "../hooks/useCalendarEvents";
import { useRef } from "react";
import CalendarTimeSlot from "../CalendarTimeSlot/CalendarTimeSlot";
import { StyledCalendarSidebar } from "./styles";
import useSystemSettings from "../../../stores/systemSettingsStore";

interface CalendarSidebarProps {
  date: Date;
  prevDay(): void;
  nextDay(): void;
}

// eslint-disable-next-line no-empty-pattern
export default function CalendarSidebar({}: CalendarSidebarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollbarColor] = useSystemSettings((s) => [s.iconColor]);
  return (
    <StyledCalendarSidebar
      scrollbarColor={scrollbarColor}
      className="calendar__side-bar"
      ref={ref}
    >
      {Array.from({ length: 25 }).map((_, i) => (
        <>
          <CalendarTimeSlot hour={i} />
        </>
      ))}
    </StyledCalendarSidebar>
  );
}
