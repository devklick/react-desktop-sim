import styled from "@emotion/styled";

export const StyledSettings = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  grid-template-areas: "side-bar main-content";
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

interface StyledPageProps {
  scrollbarColor: string;
}
export const StyledPage = styled.div<StyledPageProps>`
  overflow: auto;
  scrollbar-color: ${(p) => p.scrollbarColor} transparent;
`;

export const StyledSections = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  &:last-of-type ~ hr {
    display: none;
  }
`;

export const StyledSection = styled.div``;

export const StyledSectionTitle = styled.h1`
  margin: 0;
  font-size: 18px;
`;

export const StyledSectionDescription = styled.p``;

export const StyledSectionValue = styled.input`
  width: 100%;
`;
