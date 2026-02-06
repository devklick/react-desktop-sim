import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import {
  StyledButtons,
  StyledCalc,
  StyledInputOutput,
  StyledInputOutputContents,
} from "./styles";
import { BorderedAppContentHandles } from "../../components/BorderedApp/BorderedApp";
import useSystemSettings from "../../stores/systemSettingsStore";
import CommonButton from "../../components/Button";

export type CalculatorHandles = BorderedAppContentHandles<HTMLDivElement>;

interface CalculatorProps {}

const isDigit = (key: string) => /^[0-9]$/.test(key);
const operators = new Set(["+", "-", "*", "/", "%"]);

const Calculator = forwardRef<CalculatorHandles, CalculatorProps>(
  (_props, ref) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [
      scrollbarColor,
      secondaryColor,
      fontColor,
      primaryColor,
      errorColor,
    ] = useSystemSettings((s) => [
      s.iconColor,
      s.secondaryColor,
      s.fontColor,
      s.primaryColor,
      s.errorColor,
    ]);
    const appendToInput = (value: string) =>
      setInput((current) => current + value);
    const removeFromEnd = (count: number = 1) =>
      setInput((current) => {
        console.log("removingFromEnd", "current", current);
        return current.slice(0, -count);
      });
    const clear = () => setInput("");
    const evaluate = useCallback(() => {
      try {
        setInput(String(eval(input)));
        setOutput("");
      } catch {
        setOutput("Invalid");
      }
    }, [input]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
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
      [evaluate],
    );

    useImperativeHandle(ref, () => ({
      onBorderedAppKeyDown: handleKeyDown,
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
      mathematicalChar,
      displayChar = mathematicalChar.toString(),
      action,
      buttonColor,
      disabled,
    }: {
      mathematicalChar: string | number;
      displayChar?: string;
      action: "append-to-end" | "remove-from-end" | "evaluate" | "clear";
      buttonColor: string;
      disabled?: boolean;
    }) {
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
        <CommonButton
          onClick={handleClick}
          width={"100%"}
          height={"100%"}
          borderRadius={12}
          backgroundColor={buttonColor}
          color={fontColor}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={`calculator-button--${displayChar}`}
        >
          {displayChar}
        </CommonButton>
      );
    }

    return (
      <StyledCalc ref={elementRef}>
        <StyledInputOutput
          direction="input"
          roundTop
          scrollbarColor={scrollbarColor}
        >
          <StyledInputOutputContents>{input}</StyledInputOutputContents>
        </StyledInputOutput>
        <StyledInputOutput direction="output" scrollbarColor={scrollbarColor}>
          <StyledInputOutputContents>{output}</StyledInputOutputContents>
        </StyledInputOutput>
        <StyledButtons>
          <Button
            mathematicalChar={"AC"}
            action="clear"
            buttonColor={secondaryColor}
          />
          <div />
          <div />
          <Button
            mathematicalChar="/"
            displayChar="÷"
            action="append-to-end"
            buttonColor={secondaryColor}
          />

          <Button
            mathematicalChar={7}
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar={8}
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar={9}
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar="*"
            displayChar="x"
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar={4}
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar={5}
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar={6}
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar="-"
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar={1}
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar={2}
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar={3}
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar="+"
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar={0}
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar="."
            action="append-to-end"
            buttonColor={secondaryColor}
          />
          <Button
            mathematicalChar="←"
            action="remove-from-end"
            buttonColor={errorColor}
          />
          <Button
            mathematicalChar="="
            action="evaluate"
            buttonColor={primaryColor}
            disabled={!input}
          />
        </StyledButtons>
      </StyledCalc>
    );
  },
);
export default Calculator;
