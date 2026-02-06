import styled, { CSSObject } from "@emotion/styled";
import { isLight } from "../../common/utils/colorUtils";
import { darken, lighten } from "polished";
import { CSSProperties } from "react";

export interface StyledButtonProps {
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  backgroundColorHover?: string;
  backgroundColorActive?: string;
  color?: string;
  colorHover?: string;
  colorActive?: string;
  disabled?: boolean;
  active?: boolean;
  borderRadius?: number;
  group?: "horizontal" | "vertical";
  padding?: CSSObject["padding"];
  justifyContent?: CSSProperties["justifyContent"];
  separators?: boolean;
  separatorColor?: string;
}

export const StyledButton = styled.div<StyledButtonProps>`
  ${buildStyledButton}
`;

function buildStyledButton({
  width = "100%",
  borderRadius = 6,
  justifyContent = "center",
  ...props
}: StyledButtonProps): CSSObject {
  const styles: CSSObject = {
    position: "relative",
    ...props,
    width: typeof width === "string" ? width : `${width}px`,
    height:
      typeof props.height === "string" ? props.height : `${props.height}px`,
    border: "none",
    transition: "background-color 0.2s, color 0.2s",
    ":disabled": {
      opacity: 0.52,
    },
    backgroundColor: props.active
      ? getBackgroundColorActive(props)
      : props.backgroundColor,
    display: "flex",
    justifyContent,
    alignItems: "center",
    ":hover": {
      backgroundColor: getBackgroundColorHover(props),
    },
    ":active": {
      backgroundColor: getBackgroundColorActive(props),
    },
    ":focus-visible": {
      backgroundColor: getBackgroundColorHover(props),
      outline: "none",
    },
    ...radiusStyles({ borderRadius, group: props.group }), // this breaks the return type somehow. Something funky when spreading the emotion type
  } as CSSObject;

  if (props.group && props.separators) {
    let width: string;
    let height: string;
    switch (props.group) {
      case "horizontal":
        width = "1px";
        height = "100%";
        break;
      case "vertical":
        width = "100%";
        height = "1px";
        break;
    }
    styles["&:not(:first-of-type)::before"] = {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width,
      height,
      background: props.separatorColor ?? props.color,
    };
  }
  return styles;
}

function getBackgroundColorActive(props: StyledButtonProps) {
  if (props.disabled) return undefined;
  if (props.backgroundColorActive) return props.backgroundColorActive;
  if (props.backgroundColor) {
    return isLight(props.backgroundColor)
      ? darken(0.2, props.backgroundColor)
      : lighten(0.2, props.backgroundColor);
  }
  return undefined;
}
function getBackgroundColorHover(props: StyledButtonProps) {
  if (props.disabled) return undefined;
  if (props.backgroundColorHover) return props.backgroundColorHover;
  if (props.backgroundColor) {
    return isLight(props.backgroundColor)
      ? darken(0.1, props.backgroundColor)
      : lighten(0.1, props.backgroundColor);
  }
  return undefined;
}

function radiusStyles({
  group,
  borderRadius,
}: Pick<StyledButtonProps, "group" | "borderRadius">): CSSObject {
  const r = `${borderRadius}px`;

  if (!group) {
    return {
      borderRadius: r,
    };
  }

  const horizontal = group === "horizontal";

  return {
    ":first-of-type": horizontal
      ? {
          borderTopLeftRadius: r,
          borderBottomLeftRadius: r,
        }
      : {
          borderTopLeftRadius: r,
          borderTopRightRadius: r,
        },

    ":last-of-type": horizontal
      ? {
          borderTopRightRadius: r,
          borderBottomRightRadius: r,
        }
      : {
          borderBottomLeftRadius: r,
          borderBottomRightRadius: r,
        },
  };
}
