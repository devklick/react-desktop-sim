import { useRef } from "react";
import BorderedAppLauncher from "../../../components/BottomBar/Launcher";
import WebBrowser, { WebBrowserHandles } from "../WebBrowser";

interface WebBrowserLauncherProps {}

const windowType = "web-browser";

// eslint-disable-next-line no-empty-pattern
function WebBrowserLauncher({}: WebBrowserLauncherProps) {
  const ref = useRef<WebBrowserHandles>(null);
  return (
    <BorderedAppLauncher
      windowType={windowType}
      WindowTitle="Web Browser"
      initialDimensions={{ height: 400, width: 400 }}
      appContent={<WebBrowser />}
      icon=""
      menus={[]}
      contentRef={ref}
    />
  );
}

export default WebBrowserLauncher;
