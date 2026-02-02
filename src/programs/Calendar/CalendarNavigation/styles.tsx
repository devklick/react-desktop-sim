import styled from "@emotion/styled";

interface StyledCalendarNavigationSectionProps {}

interface StyledCalendarNavigationProps {}
export const StyledCalendarNavigation = styled.div<StyledCalendarNavigationProps>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  grid-area: nav;
  padding-bottom: 5px;
`;

export const StyledCalendarNavigationSection = styled.div<StyledCalendarNavigationSectionProps>`
  width: 100%;
  display: grid;
  grid-template-columns: 30px auto 30px;
`;
