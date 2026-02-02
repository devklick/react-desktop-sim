import { getDayName } from "../../../common/utils/dateUtils";
import useSystemSettings from "../../../stores/systemSettingsStore";
import { StyledCalendarDay, StyledCalendarDayNo } from "./styles";

interface CalendarDayProps {
  date: Date;
  isToday: boolean;
  isThisMonth: boolean;
  onClick(): void;
  isSelected: boolean;
}

export default function CalendarDay({
  date,
  isToday,
  isThisMonth,
  onClick,
  isSelected,
}: CalendarDayProps) {
  const [mainColor, fontColor, primaryColor] = useSystemSettings((s) => [
    s.mainColor,
    s.fontColor,
    s.primaryColor,
  ]);
  const dayOfWeek = getDayName(date.getDay());
  const dayOfMonth = date.getDate();

  return (
    <StyledCalendarDay
      backgroundColor={mainColor}
      color={fontColor}
      currentMonth={isThisMonth}
      onClick={onClick}
      outlineColor={primaryColor}
      isSelected={isSelected}
    >
      <span>{dayOfWeek}</span>
      <span>
        <StyledCalendarDayNo>{dayOfMonth}</StyledCalendarDayNo>
      </span>
      {isToday && <span>TODAY</span>}
    </StyledCalendarDay>
  );
}
