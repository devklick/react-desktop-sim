import { forwardRef, useImperativeHandle, useRef } from "react";
import useSystemSettings from "../../stores/systemSettingsStore";
import { StyledTextArea, StyledTextEditor } from "./styles";
import { BorderedAppContentHandles } from "../../components/BorderedApp/BorderedApp";

export type TextEditorHandles = BorderedAppContentHandles<HTMLDivElement>;
interface TextEditorProps {}

const TextEditor = forwardRef<TextEditorHandles, TextEditorProps>(
  (_props, ref) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const settings = useSystemSettings();

    useImperativeHandle(ref, () => ({
      onParentKeyDown() {},
      element: elementRef.current,
    }));

    return (
      <StyledTextEditor className="text-editor" ref={elementRef}>
        <StyledTextArea
          selectedColor={settings.accentColor}
          className="text-editor__content"
        />
      </StyledTextEditor>
    );
  },
);

export default TextEditor;
