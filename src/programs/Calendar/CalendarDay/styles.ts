import styled from "@emotion/styled";
import { darken, lighten } from "polished";
import { isLight } from "../../../common/utils/colorUtils";

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
      : isLight(props.color)
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
