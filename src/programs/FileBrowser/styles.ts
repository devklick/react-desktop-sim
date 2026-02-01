import styled from "@emotion/styled";

export const StyledFileBrowser = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 150px auto;
  grid-template-rows: 30px auto 25px;
  grid-template-areas:
    "top-bar top-bar"
    "side-bar main-content"
    "side-bar bottom-bar";
  border-radius: 10px;
  grid-gap: 10px;
  padding: 5px;
  box-sizing: border-box;
`;

export const StyledTopBar = styled.div`
  grid-area: top-bar;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  /* padding: 10px; */
  align-items: center;
`;

export const StyledTopBarButtons = styled.div`
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface StyledTopBarPathProps {
  backgroundColor: string;
  color: string;
}
export const StyledTopBarPath = styled.input<StyledTopBarPathProps>`
  height: 100%;
  width: 100%;
  padding: 5px 10px;
  border-radius: 50px;
  border: none;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  &:focus-visible {
    outline: none;
  }
`;

export const StyledBottomBar = styled.div`
  grid-area: bottom-bar;
  width: 100%;
  height: 100%;
`;
