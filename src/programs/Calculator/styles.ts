import styled from "@emotion/styled";

export const StyledCalc = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 3fr;
  grid-template-areas:
    "input"
    "output"
    "buttons";
  /* padding: 5px; */
  border-radius: 10px;
  box-sizing: border-box;
  gap: 5px;
`;

export const StyledInputOutput = styled.div<{
  direction: "input" | "output";
  roundTop?: boolean;
  scrollbarColor: string;
}>`
  box-shadow: 0px 0px 4px rgb(0, 0, 0, 0.5) inset;
  font-size: ${(props) => (props.direction === "input" ? 20 : 16)}px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  grid-area: ${(props) => props.direction};
  border-top-left-radius: ${(p) => (p.roundTop ? "10px" : 0)};
  border-top-right-radius: ${(p) => (p.roundTop ? "10px" : 0)};
  overflow: hidden;
  scrollbar-color: ${(p) => p.scrollbarColor} transparent;
`;

export const StyledInputOutputContents = styled.div`
  text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5);
  overflow-x: auto;
  width: 100%;
  text-align: end;
`;

export const StyledButtons = styled.div`
  min-height: 0;
  grid-area: buttons;
  width: 100%;
  height: 100%;
  justify-self: center;
  display: grid;
  gap: 4px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  box-sizing: border-box;
`;
