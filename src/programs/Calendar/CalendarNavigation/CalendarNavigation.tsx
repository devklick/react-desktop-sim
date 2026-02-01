import { getMonthName } from "../../../common/utils/dateUtils";
import Button from "../../../components/Button";
import useSystemSettings from "../../../stores/systemSettingsStore";
import {
  StyledCalendarNavigation,
  StyledCalendarNavigationSection,
} from "./styles";

interface StyledNavigationProps {
  month: number;
  year: number;
  onClickPrevMonth(): void;
  onClickNextMonth(): void;
  onClickPrevYear(): void;
  onClickNextYear(): void;
}
export default function CalendarNavigation({
  month,
  year,
  onClickNextMonth,
  onClickNextYear,
  onClickPrevMonth,
  onClickPrevYear,
}: StyledNavigationProps) {
  const [fontColor, buttonColor] = useSystemSettings((s) => [
    s.fontColor,
    s.mainColor,
  ]);
  return (
    <StyledCalendarNavigation className="calendar__nav">
      <StyledCalendarNavigationSection className="calendar__nav-section">
        <Button
          backgroundColor={buttonColor}
          color={fontColor}
          onClick={onClickPrevMonth}
          group="horizontal"
        >{`<`}</Button>
        <Button
          backgroundColor={buttonColor}
          color={fontColor}
          group="horizontal"
        >
          {getMonthName(month)}
        </Button>
        <Button
          backgroundColor={buttonColor}
          color={fontColor}
          onClick={onClickNextMonth}
          group="horizontal"
        >{`>`}</Button>
      </StyledCalendarNavigationSection>

      <StyledCalendarNavigationSection className="calendar__nav-section">
        <Button
          backgroundColor={buttonColor}
          color={fontColor}
          onClick={onClickPrevYear}
          group="horizontal"
        >{`<`}</Button>
        <Button
          backgroundColor={buttonColor}
          color={fontColor}
          group="horizontal"
        >
          {year}
        </Button>
        <Button
          backgroundColor={buttonColor}
          color={fontColor}
          onClick={onClickNextYear}
          group="horizontal"
        >{`>`}</Button>
      </StyledCalendarNavigationSection>
    </StyledCalendarNavigation>
  );
}
