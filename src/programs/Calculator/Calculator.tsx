import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import {
  StyledButton,
  StyledButtonContent,
  StyledButtons,
  StyledCalc,
  StyledInputOutput,
  StyledInputOutputContents,
} from "./styles";
import { BorderedAppContentHandles } from "../../components/BorderedApp/BorderedApp";

export type CalculatorHandles = BorderedAppContentHandles<HTMLDivElement>;

interface CalculatorProps {}

const isDigit = (key: string) => /^[0-9]$/.test(key);
const operators = new Set(["+", "-", "*", "/", "%"]);

const Calculator = forwardRef<CalculatorHandles, CalculatorProps>(
  (_props, ref) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const appendToInput = (value: string) =>
      setInput((current) => current + value);
    const removeFromEnd = (count: number = 1) =>
      setInput((current) => current.slice(0, -count));
    const clear = () => setInput("");
    const evaluate = () => {
      try {
        setInput(eval(input));
        setOutput("");
      } catch {
        setOutput("Invalid");
      }
    };

    useImperativeHandle(ref, () => ({
      onParentKeyDown(e) {
        const { key } = e;

        if (isDigit(key) || operators.has(key)) {
          appendToInput(key);
          return;
        }

        switch (key) {
          case ".":
          case "(":
          case ")":
            appendToInput(key);
            break;

          case "=":
          case "Enter":
            evaluate();
            break;

          case "Backspace":
            removeFromEnd();
            break;

          case "Escape":
            clear();
            break;
        }
      },
      element: elementRef.current,
    }));

    // Whenever the input changes we'll check if it forms a valid
    // calculation, and if so, add it to the output
    useEffect(() => {
      try {
        const res = eval(input);
        setOutput(res);
      } catch {
        /* empty */
      }
    }, [input]);

    function Button({
      displayChar,
      mathematicalChar,
      action,
    }: {
      mathematicalChar: string | number;
      displayChar?: string;
      action: "append-to-end" | "remove-from-end" | "evaluate" | "clear";
    }) {
      if (displayChar === undefined) {
        displayChar = mathematicalChar.toString();
      }

      function handleClick() {
        switch (action) {
          case "append-to-end":
            return appendToInput(mathematicalChar.toString());
            break;
          case "remove-from-end":
            return removeFromEnd();
            break;
          case "evaluate":
            return evaluate();
          case "clear":
            return clear();
        }
      }

      return (
        <StyledButton onClick={handleClick}>
          <StyledButtonContent>{displayChar}</StyledButtonContent>
        </StyledButton>
      );
    }

    return (
      <StyledCalc ref={elementRef}>
        <StyledInputOutput direction="input">
          <StyledInputOutputContents>{input}</StyledInputOutputContents>
        </StyledInputOutput>
        <StyledInputOutput direction="output">
          <StyledInputOutputContents>{output}</StyledInputOutputContents>
        </StyledInputOutput>
        <StyledButtons>
          <Button mathematicalChar={"AC"} action="clear" />
          <div />
          <div />
          <Button mathematicalChar="/" displayChar="÷" action="append-to-end" />

          <Button mathematicalChar={7} action="append-to-end" />
          <Button mathematicalChar={8} action="append-to-end" />
          <Button mathematicalChar={9} action="append-to-end" />
          <Button mathematicalChar="*" displayChar="x" action="append-to-end" />
          <Button mathematicalChar={4} action="append-to-end" />
          <Button mathematicalChar={5} action="append-to-end" />
          <Button mathematicalChar={6} action="append-to-end" />
          <Button mathematicalChar="-" action="append-to-end" />
          <Button mathematicalChar={1} action="append-to-end" />
          <Button mathematicalChar={2} action="append-to-end" />
          <Button mathematicalChar={3} action="append-to-end" />
          <Button mathematicalChar="+" action="append-to-end" />
          <Button mathematicalChar={0} action="append-to-end" />
          <Button mathematicalChar="." action="append-to-end" />
          <Button mathematicalChar="←" action="remove-from-end" />
          <Button mathematicalChar="=" action="evaluate" />
        </StyledButtons>
      </StyledCalc>
    );
  },
);
export default Calculator;
