import useSystemSettings from "../../stores/systemSettingsStore";
import ClockMenu from "./ClockMenu";
import FocusedWindowMenu from "./FocusedWindowMenu";
import SystemTray from "./SystemTray";

import {
  StyledTopBar,
  StyledTopBarContainer,
  StyledTopBarContents,
} from "./styles";

interface TopBarProps {}

// eslint-disable-next-line no-empty-pattern
function TopBar({}: TopBarProps) {
  const { mainColor, opacity, blur } = useSystemSettings();
  return (
    <StyledTopBarContainer id="top-bar__container">
      <StyledTopBar
        id="top-bar"
        backgroundColor={mainColor}
        opacity={opacity}
        blur={blur}
      >
        <StyledTopBarContents id="top-bar__contents">
          <FocusedWindowMenu />
          <ClockMenu />
          <SystemTray />
        </StyledTopBarContents>
      </StyledTopBar>
    </StyledTopBarContainer>
  );
}

export default TopBar;
