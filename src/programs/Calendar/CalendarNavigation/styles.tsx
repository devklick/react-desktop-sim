import styled from "@emotion/styled";

interface StyledCalendarNavigationSectionProps {}

interface StyledCalendarNavigationProps {}
export const StyledCalendarNavigation = styled.div<StyledCalendarNavigationProps>`
  width: 100%;
  display: flex;
  grid-area: nav;
`;

interface StyledNavigationButtonProps {}
export const StyledNavigationButton = styled.button<StyledNavigationButtonProps>``;

export const StyledCalendarNavigationSection = styled.div<StyledCalendarNavigationSectionProps>`
  flex: 1;
  display: flex;
  justify-content: center;
`;
