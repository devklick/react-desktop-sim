import styled from "@emotion/styled";

interface StyledMainContentProps {
  scrollbarColor: string;
}
export const StyledMainContent = styled.div<StyledMainContentProps>`
  grid-area: main-content;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: min-content;
  box-sizing: border-box;
  scrollbar-color: ${(p) => p.scrollbarColor} transparent;
`;
