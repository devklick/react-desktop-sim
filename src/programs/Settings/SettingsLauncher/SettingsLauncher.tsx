import { useRef } from "react";
import Settings from "..";
import Launcher from "../../../components/BottomBar/Launcher";
import { FileBrowserHandles } from "../../FileBrowser/FileBrowser";

interface SettingsLauncherProps {}

// eslint-disable-next-line no-empty-pattern
function SettingsLauncher({}: SettingsLauncherProps) {
  const ref = useRef<FileBrowserHandles>(null);
  return (
    <Launcher
      windowType={"settings"}
      WindowTitle="Settings"
      initialDimensions={{ height: 500, width: 500 }}
      menus={[]}
      appContent={<Settings />}
      icon=""
      contentRef={ref}
    ></Launcher>
  );
}

export default SettingsLauncher;
