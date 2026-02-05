import { forwardRef, PropsWithChildren, useCallback } from "react";
import { StyledButton, StyledButtonProps } from "./styles";
import { setRef } from "../../common/utils/htmlHelpers";
import { adjustLuminance } from "../../common/utils/colorUtils";

interface ButtonProps extends StyledButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ onClick, children, ...rest }, ref) => {
    const onRef = useCallback(
      (el: HTMLButtonElement | null) => setRef(ref, el),
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
      >
        {children}
      </StyledButton>
    );
  },
);

export default Button;
