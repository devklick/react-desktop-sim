import styled from "@emotion/styled";
import { darken } from "polished";

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

interface StyledCalendarNavigationSectionProps {}

export const StyledCalendarNavigationSection = styled.div<StyledCalendarNavigationSectionProps>`
  flex: 1;
  display: flex;
  justify-content: center;
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
  background: ${(props) => props.backgroundColor};
  color: ${(props) =>
    props.currentMonth ? undefined : darken(0.5, props.color)};
`;

interface StyledCalendarNavigationProps {}
export const StyledCalendarNavigation = styled.div<StyledCalendarNavigationProps>`
  width: 100%;
  display: flex;
`;

interface StyledNavigationButtonProps {}
export const StyledNavigationButton = styled.button<StyledNavigationButtonProps>``;
