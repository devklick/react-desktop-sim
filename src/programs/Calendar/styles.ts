import styled from "@emotion/styled";

interface StyledCalendarLayoutProps {
  sidebarOpen: boolean;
}

// Todo: support displaying day info / events on large & small screens
export const StyledCalendarLayout = styled.div<StyledCalendarLayoutProps>`
  width: 100%;
  height: 100%;
  display: grid;
  /* flex-direction: column; */
  box-sizing: border-box;
  grid-template-areas:
    "nav nav side"
    "days days side"
    "days days side";
  grid-template-rows: 50px 1fr 1fr;
  grid-template-columns: 1fr 1fr minmax(150px, 1fr);
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
  grid-area: days;
`;
