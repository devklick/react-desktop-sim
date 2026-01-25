import styled from "@emotion/styled";
import { darken, getLuminance, lighten } from "polished";
import { isLight } from "../../common/utils/colorUtils";

interface StyledCalendarLayoutProps {
  sidebarOpen: boolean;
}

// Todo: support displaying day info / events on large & small screens
export const StyledCalendarLayout = styled.div<StyledCalendarLayoutProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

interface StyledCalendarDaysProps {
  borderColor: string;
}

export const StyledCalendarDays = styled.div<StyledCalendarDaysProps>`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 1px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
`;

interface StyledCalendarDayProps {
  backgroundColor: string;
  color: string;
  currentMonth: boolean;
}

export const StyledCalendarDay = styled.div<StyledCalendarDayProps>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) =>
    props.currentMonth
      ? undefined
      : getLuminance(props.color) > 0.5
        ? darken(0.3, props.color)
        : lighten(0.3, props.color)};
  transition: background-color 0.3s;
  :hover {
    background-color: ${(props) =>
      isLight(props.backgroundColor)
        ? darken(0.1, props.backgroundColor)
        : lighten(0.1, props.backgroundColor)};
  }
`;

interface StyledCalendarDaysFrameProps {
  frameColor: string;
}

export const StyledCalendarDaysFrame = styled.div<StyledCalendarDaysFrameProps>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: ${(props) => props.frameColor};
  padding: 1px;
  box-sizing: border-box;
`;
