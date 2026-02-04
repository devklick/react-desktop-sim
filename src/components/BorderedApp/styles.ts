import styled from "@emotion/styled";
import { Dimensions, Position } from "../../hooks/useDragToResize";
import { darken, transparentize } from "polished";

interface StyledBorderedAppProps {
  initialDimensions: Dimensions;
  initialPosition: Position;
  zIndex: number | undefined;
  backgroundColor: string;
  display: "none" | "grid";
  opacity: number;
  blur: number;
}

export const StyledBorderedApp = styled.div<StyledBorderedAppProps>`
  min-height: 0;
  width: fit-content;
  height: fit-content;
  display: grid;
  grid-template-rows: 32px auto;
  grid-template-areas:
    "title-bar"
    "content";
  border-radius: 10px;
  box-shadow:
    0px -2px 10px 1px rgb(0, 0, 0, 0.4),
    0px 0px 3px ${transparentize(0.5, "#8d8d8d")} inset;
  position: fixed;
  width: ${(props) => props.initialDimensions.width}px;
  height: ${(props) => props.initialDimensions.height}px;
  z-index: ${(props) => props.zIndex};
  background-color: ${(props) =>
    transparentize(props.opacity, props.backgroundColor)};
  backdrop-filter: ${(props) => props.blur && `blur(${props.blur}px)`};
  display: ${(props) => props.display};
  left: ${(props) => props.initialPosition.x}px;
  top: ${(props) => props.initialPosition.y}px;
`;
export const StyledCorner = styled.div<{
  location: "ne" | "se" | "sw" | "nw";
}>`
  width: 10px;
  height: 10px;
  position: absolute;
  z-index: 2;
  top: ${(props) => (props.location.startsWith("n") ? 0 : undefined)};
  bottom: ${(props) => (props.location.startsWith("s") ? 0 : undefined)};
  left: ${(props) => (props.location.endsWith("w") ? 0 : undefined)};
  right: ${(props) => (props.location.endsWith("e") ? 0 : undefined)};
  &:hover {
    cursor: ${(props) => props.location}-resize;
  }
`;

export const StyledEdge = styled.div<{ location: "n" | "e" | "s" | "w" }>`
  position: absolute;
  z-index: 1;
  height: ${(props) => (["n", "s"].includes(props.location) ? "5px" : "100%")};
  width: ${(props) => (["n", "s"].includes(props.location) ? "100%" : "5px")};
  top: ${(props) => (props.location === "n" ? 0 : undefined)};
  bottom: ${(props) => (props.location === "s" ? 0 : undefined)};
  left: ${(props) => (props.location === "w" ? 0 : undefined)};
  right: ${(props) => (props.location === "e" ? 0 : undefined)};
  &:hover {
    cursor: ${(props) => props.location}-resize;
  }
`;

export const StyledTitleBar = styled.div`
  grid-area: title-bar;
  cursor: default;
  padding: 0 12px;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "window-menus window-title window-buttons";
`;

export const StyledWindowMenusWrapper = styled.div`
  grid-area: window-menus;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const StyledWindowMenus = styled.div`
  display: flex;
  gap: 5px;
  height: 100%;
`;

export const StyledTitleWrapper = styled.div`
  grid-area: window-title;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledWindowButtonsWrapper = styled.div`
  grid-area: window-buttons;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const StyledWindowButtons = styled.div`
  display: flex;
  gap: 5px;
`;

type ButtonType = "min" | "max" | "close";
function getButtonBackgroundColor(type: ButtonType): string {
  switch (type) {
    case "close":
      return "rgb(151, 59, 59)";
    case "min":
      return "rgb(219, 196, 90)";
    case "max":
      return "rgb(108, 158, 108)";
  }
}

interface StyledWindowButtonProps {
  buttonType: ButtonType;
  frameColor: string;
}
export const StyledWindowButton = styled.button<StyledWindowButtonProps>`
  border-radius: 20px;
  width: 14px;
  height: 14px;
  background-color: black;
  transform: scale(1);
  transition: all 0.2s ease;
  background-color: ${(props) => getButtonBackgroundColor(props.buttonType)};
  border: none;
  box-shadow:
    inset 0 0 0 0.5px ${(p) => transparentize(0.5, darken(0.1, p.frameColor))},
    inset 0 1px 2px rgba(255, 255, 255, 0.3),
    0 1px 5px ${(p) => transparentize(0.5, darken(0.1, p.frameColor))};

  &:hover {
    transform: scale(1.2);
    transition: all 0.2s ease;
  }
  &:active {
    box-shadow:
      inset 1px 1px 2px 1px
        ${(p) => transparentize(0.5, darken(0.1, p.frameColor))},
      inset 0 1px 2px ${(p) => transparentize(0.5, darken(0.1, p.frameColor))},
      0 1px 5px ${(p) => transparentize(0.5, darken(0.1, p.frameColor))};
  }
`;

export const StyledContent = styled.div`
  grid-area: content;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 5px;
  padding-top: 0;
`;

interface StyledContentInnerProps {
  shadowColor: string;
}
export const StyledContentInner = styled.div<StyledContentInnerProps>`
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 4px ${(p) => p.shadowColor} inset;

  overflow: hidden;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 5px;
`;
