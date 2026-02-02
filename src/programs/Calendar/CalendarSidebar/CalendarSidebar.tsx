// import useCalendarEvents from "../hooks/useCalendarEvents";
import { StyledCalendarSidebar } from "./styles";

interface CalendarSidebarProps {
  date: Date;
  prevDay(): void;
  nextDay(): void;
}

// eslint-disable-next-line no-empty-pattern
export default function CalendarSidebar({}: CalendarSidebarProps) {
  return (
    <StyledCalendarSidebar className="calendar__side-bar"></StyledCalendarSidebar>
  );
}
