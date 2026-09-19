import { useRef } from "react";
import Settings from "..";
import BorderedAppLauncher from "../../../components/BottomBar/Launcher";
import { FileBrowserHandles } from "../../FileBrowser/FileBrowser";

interface SettingsLauncherProps {}

// eslint-disable-next-line no-empty-pattern
function SettingsLauncher({}: SettingsLauncherProps) {
  const ref = useRef<FileBrowserHandles>(null);
  return (
    <BorderedAppLauncher
      windowType={"settings"}
      WindowTitle="Settings"
      initialDimensions={{ height: 500, width: 500 }}
      menus={[]}
      appContent={<Settings />}
      icon=""
      contentRef={ref}
    ></BorderedAppLauncher>
  );
}

export default SettingsLauncher;
