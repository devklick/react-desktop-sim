import CalculatorLauncher from "../../programs/Calculator/CalculatorLauncher";
import CalendarLauncher from "../../programs/Calendar/CalendarLauncher/CalendarLauncher";
import FileBrowserLauncher from "../../programs/FileBrowser/FileBrowserLauncher";
import SettingsLauncher from "../../programs/Settings/SettingsLauncher";
import TextEditorLauncher from "../../programs/TextEditor/TextEditorLauncher";
import WebBrowserLauncher from "../../programs/WebBrowser/WebBrowserLauncher";
import useSystemSettings from "../../stores/systemSettingsStore";

import { StyledBottomBar, StyledContainer, StyledContents } from "./styles";

interface BottomBarProps {}

// eslint-disable-next-line no-empty-pattern
function BottomBar({}: BottomBarProps) {
  const { mainColor, opacity, blur } = useSystemSettings();
  return (
    <StyledContainer id="bottom-bar__container">
      <StyledBottomBar
        id="bottom-bar"
        backgroundColor={mainColor}
        opacity={opacity}
        blur={blur}
      >
        <StyledContents id="bottom-bar__contents">
          <TextEditorLauncher />
          <CalculatorLauncher />
          <WebBrowserLauncher />
          <FileBrowserLauncher />
          <SettingsLauncher />
          <CalendarLauncher />
        </StyledContents>
      </StyledBottomBar>
    </StyledContainer>
  );
}

export default BottomBar;
