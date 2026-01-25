import { getMonthName } from "../../../common/utils/dateUtils";
import {
  StyledCalendarNavigation,
  StyledCalendarNavigationSection,
  StyledNavigationButton,
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
  return (
    <StyledCalendarNavigation className="calendar__nav">
      <StyledCalendarNavigationSection className="calendar__nav-section">
        <StyledNavigationButton
          className="calendar__nav-button"
          onClick={onClickPrevMonth}
        >{`<`}</StyledNavigationButton>
        <StyledNavigationButton className="calendar__nav-button">
          {getMonthName(month)}
        </StyledNavigationButton>
        <StyledNavigationButton
          className="calendar__nav-button"
          onClick={onClickNextMonth}
        >{`>`}</StyledNavigationButton>
      </StyledCalendarNavigationSection>

      <StyledCalendarNavigationSection className="calendar__nav-section">
        <StyledNavigationButton
          className="calendar__nav-button"
          onClick={onClickPrevYear}
        >{`<`}</StyledNavigationButton>
        <StyledNavigationButton className="calendar__nav-button">
          {year}
        </StyledNavigationButton>
        <StyledNavigationButton
          className="calendar__nav-button"
          onClick={onClickNextYear}
        >{`>`}</StyledNavigationButton>
      </StyledCalendarNavigationSection>
    </StyledCalendarNavigation>
  );
}
