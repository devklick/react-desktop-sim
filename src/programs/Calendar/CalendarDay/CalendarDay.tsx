import { getDayName } from "../../../common/utils/dateUtils";
import useSystemSettings from "../../../stores/systemSettingsStore";
import { StyledCalendarDay } from "./styles";

interface CalendarDayProps {
  date: Date;
  isToday: boolean;
  isThisMonth: boolean;
  onClick(): void;
}

export default function CalendarDay({
  date,
  isToday,
  isThisMonth,
  onClick,
}: CalendarDayProps) {
  const [mainColor, fontColor] = useSystemSettings((s) => [
    s.mainColor,
    s.accentColor,
    s.fontColor,
  ]);
  const dayOfWeek = getDayName(date.getDay());
  const dayOfMonth = date.getDate();

  return (
    <StyledCalendarDay
      backgroundColor={mainColor}
      color={fontColor}
      currentMonth={isThisMonth}
      onClick={onClick}
    >
      <span>{dayOfWeek}</span>
      <span>{dayOfMonth}</span>
      {isToday && <span>TODAY</span>}
    </StyledCalendarDay>
  );
}
