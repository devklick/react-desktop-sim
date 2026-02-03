import TopBar from "../TopBar";
import Content from "../Content";
import BottomBar from "../BottomBar";
import useSystemSettings from "../../stores/systemSettingsStore";

import { StyledBackground, StyledDesktop } from "./styles";
import useWindowManagerStore from "../../stores/windowManagerStore";

interface DesktopProps {}

// eslint-disable-next-line no-empty-pattern
function Desktop({}: DesktopProps) {
  const settings = useSystemSettings();
  const desktopRef = useWindowManagerStore((s) => s.desktopRef);
  return (
    <StyledDesktop id="desktop" ref={desktopRef}>
      <StyledBackground id="background" backgroundUrl={settings.background} />
      <TopBar />
      <Content />
      <BottomBar />
    </StyledDesktop>
  );
}

export default Desktop;
