import { forwardRef, PropsWithChildren, useCallback } from "react";
import { StyledButton, StyledButtonProps } from "./styles";

interface ButtonProps extends StyledButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ onClick, children, ...rest }, ref) => {
    const onRef = useCallback(
      (el: HTMLButtonElement | null) => {
        if (typeof ref === "function") {
          ref(el);
        } else if (ref != null) {
          ref.current = el;
        }
      },
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
