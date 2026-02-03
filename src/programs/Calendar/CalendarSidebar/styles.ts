import styled from "@emotion/styled";

interface StyledCalendarSidebarProps {
  scrollbarColor: string;
}
export const StyledCalendarSidebar = styled.div<StyledCalendarSidebarProps>`
  width: 100%;
  height: 100%;
  grid-area: side;
  overflow-y: auto;
  overflow-x: hidden; // getting a tiny amount of overflow, I think because of flex gap's sub-pixel rounding
  padding-left: 6px;
  box-sizing: border-box;
  scrollbar-color: ${(p) => p.scrollbarColor} transparent;
`;

interface StyledDayBreakProps {
  color: string;
}
export const StyledDayBreak = styled.hr<StyledDayBreakProps>`
  width: 100%;
  margin: 0;
  background-color: ${(p) => p.color};
`;
