import styled, { CSSObject } from "@emotion/styled";
import { isLight } from "../../common/utils/colorUtils";
import { darken, lighten } from "polished";

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
}

export const StyledButton = styled.button<StyledButtonProps>`
  ${buildStyledButton}
`;

function buildStyledButton({
  width = "100%",
  borderRadius = 6,
  ...props
}: StyledButtonProps): CSSObject {
  return {
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
    ":hover": {
      backgroundColor: getBackgroundColorHover(props),
    },
    ":active": {
      backgroundColor: getBackgroundColorActive(props),
    },
    ...radiusStyles({ borderRadius, group: props.group }), // this breaks the return type somehow. Something funky when spreading the emotion type
  } as CSSObject;
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
