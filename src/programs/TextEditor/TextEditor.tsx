import useSystemSettings from "../../stores/systemSettingsStore";
import { StyledTextArea, StyledTextEditor } from "./styles";

interface TextEditorProps {}

// eslint-disable-next-line no-empty-pattern
function TextEditor({}: TextEditorProps) {
  const settings = useSystemSettings();
  return (
    <StyledTextEditor className="text-editor">
      <StyledTextArea
        selectedColor={settings.accentColor}
        className="text-editor__content"
      />
    </StyledTextEditor>
  );
}

export default TextEditor;
