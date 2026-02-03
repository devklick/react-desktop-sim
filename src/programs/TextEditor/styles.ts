import styled from "@emotion/styled";

export const StyledTextEditor = styled.div`
  height: 100%;
  width: 100%;
`;

interface StyledTextAreaProps {
  selectedColor: string;
  scrollbarColor: string;
}
export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  color: white;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  scrollbar-color: ${(p) => p.scrollbarColor} transparent;

  &:focus-visible {
    outline: none;
  }

  ::selection {
    background-color: ${(props) => props.selectedColor};
  }
`;
