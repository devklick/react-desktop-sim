import { forwardRef, PropsWithChildren, useCallback } from "react";
import { StyledButton, StyledButtonProps } from "./styles";
import { setRef } from "../../common/utils/htmlHelpers";

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
    return (
      <StyledButton {...rest} onClick={onClick} ref={onRef}>
        {children}
      </StyledButton>
    );
  },
);

export default Button;
