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
  active,
  backgroundColor,
  backgroundColorActive,
  backgroundColorHover,
  color,
  colorActive,
  colorHover,
  disabled,
  group,
  height,
  padding,
  separatorColor,
  separators,
}: StyledButtonProps): CSSObject {
  const styles: CSSObject = {
    position: "relative",
    width: typeof width === "string" ? width : `${width}px`,
    height: typeof height === "string" ? height : `${height}px`,
    border: "none",
    transition: "background-color 0.2s, color 0.2s",
    ":disabled": {
      opacity: 0.52,
    },
    padding,
    backgroundColor: active
      ? getActiveColor({
          baseColor: backgroundColor,
          activeColor: backgroundColorActive,
          disabled,
        })
      : backgroundColor,
    display: "flex",
    justifyContent,
    alignItems: "center",
    boxSizing: "border-box",
    ":hover": {
      backgroundColor: getHoverColor({
        baseColor: backgroundColor,
        hoverColor: backgroundColorHover,
        disabled,
      }),
      color: getHoverColor({
        baseColor: color,
        hoverColor: colorHover,
        disabled,
      }),
    },
    ":active": {
      backgroundColor: getActiveColor({
        baseColor: backgroundColor,
        activeColor: backgroundColorActive,
        disabled,
      }),
      color: getActiveColor({
        baseColor: color,
        activeColor: colorActive,
        disabled,
      }),
    },
    ":focus-visible": {
      backgroundColor: getHoverColor({
        baseColor: backgroundColor,
        hoverColor: backgroundColorHover,
        disabled,
      }),
      outline: "none",
    },
    ...radiusStyles({ borderRadius, group }), // this breaks the return type somehow. Something funky when spreading the emotion type
  } as CSSObject;

  if (disabled) {
    styles.opacity = 0.5;
  }

  if (group && separators) {
    let width: string;
    let height: string;
    switch (group) {
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
      background: separatorColor ?? color,
    };
  }
  return styles;
}

function getActiveColor({
  disabled,
  activeColor,
  baseColor,
}: {
  disabled?: boolean;
  activeColor?: string;
  baseColor?: string;
}) {
  if (disabled) return undefined;
  if (activeColor) return activeColor;
  if (baseColor) {
    return isLight(baseColor)
      ? darken(0.2, baseColor)
      : lighten(0.2, baseColor);
  }
  return undefined;
}
function getHoverColor({
  disabled,
  hoverColor,
  baseColor: baseColor,
}: {
  disabled?: boolean;
  hoverColor?: string;
  baseColor?: string;
}) {
  if (disabled) return undefined;
  if (hoverColor) return hoverColor;
  if (baseColor) {
    return isLight(baseColor)
      ? darken(0.1, baseColor)
      : lighten(0.1, baseColor);
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
