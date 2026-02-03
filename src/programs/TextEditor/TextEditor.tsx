import { forwardRef, useImperativeHandle, useRef } from "react";
import useSystemSettings from "../../stores/systemSettingsStore";
import { StyledTextArea, StyledTextEditor } from "./styles";
import { BorderedAppContentHandles } from "../../components/BorderedApp/BorderedApp";

export type TextEditorHandles = BorderedAppContentHandles<HTMLDivElement>;
interface TextEditorProps {}

const TextEditor = forwardRef<TextEditorHandles, TextEditorProps>(
  (_props, ref) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [selectedTextColor, scrollbarColor] = useSystemSettings((s) => [
      s.secondaryColor,
      s.iconColor,
    ]);

    useImperativeHandle(ref, () => ({
      element: elementRef.current,
    }));

    return (
      <StyledTextEditor className="text-editor" ref={elementRef}>
        <StyledTextArea
          selectedColor={selectedTextColor}
          scrollbarColor={scrollbarColor}
          className="text-editor__content"
        />
      </StyledTextEditor>
    );
  },
);

export default TextEditor;
