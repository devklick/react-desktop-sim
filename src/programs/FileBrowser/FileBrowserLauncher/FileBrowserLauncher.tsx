import { useRef } from "react";
import FileBrowser from "..";
import BorderedAppLauncher from "../../../components/BottomBar/Launcher";
import { FileBrowserHandles } from "../FileBrowser";

interface FileBrowserLauncherProps {}

// eslint-disable-next-line no-empty-pattern
function FileBrowserLauncher({}: FileBrowserLauncherProps) {
  const ref = useRef<FileBrowserHandles>(null);
  return (
    <BorderedAppLauncher
      windowType={"file-browser"}
      WindowTitle="File Browser"
      initialDimensions={{ height: 500, width: 500 }}
      menus={[]}
      appContent={<FileBrowser />}
      icon=""
      contentRef={ref}
    />
  );
}

export default FileBrowserLauncher;
