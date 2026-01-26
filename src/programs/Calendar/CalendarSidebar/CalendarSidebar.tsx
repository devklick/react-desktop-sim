// import useCalendarEvents from "../hooks/useCalendarEvents";
import { StyledCalendarSidebar } from "./styles";

interface CalendarSidebarProps {
  date: Date;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CalendarSidebar({ date }: CalendarSidebarProps) {
  // const events = useCalendarEvents({ date });
  return (
    <StyledCalendarSidebar className="calendar__side-bar">
      {date.toISOString()}
    </StyledCalendarSidebar>
  );
}
