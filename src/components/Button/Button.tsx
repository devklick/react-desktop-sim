import { PropsWithChildren } from "react";
import { StyledButton, StyledButtonProps } from "./styles";

interface ButtonProps extends StyledButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

function Button({
  onClick,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <StyledButton {...rest} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
export default Button;
