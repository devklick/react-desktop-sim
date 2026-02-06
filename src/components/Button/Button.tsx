import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
} from "react";
import { StyledButton, StyledButtonProps } from "./styles";
import { setRef } from "../../common/utils/htmlHelpers";
import { adjustLuminance } from "../../common/utils/colorUtils";

interface ButtonProps
  extends StyledButtonProps, HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
  disabled?: boolean;
}

const Button = forwardRef<HTMLDivElement, PropsWithChildren<ButtonProps>>(
  ({ onClick, children, ...rest }, ref) => {
    const onRef = useCallback(
      (el: HTMLDivElement | null) => setRef(ref, el),
      [ref],
    );
    const separatorColor =
      rest.separatorColor ??
      rest.backgroundColorHover ??
      (rest.backgroundColor && adjustLuminance(0.2, rest.backgroundColor)) ??
      "white";

    return (
      <StyledButton
        {...rest}
        onClick={onClick}
        ref={onRef}
        separatorColor={separatorColor}
        role="button"
      >
        {children}
      </StyledButton>
    );
  },
);

export default Button;
