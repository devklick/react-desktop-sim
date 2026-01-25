import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import useLocalFSWithHistory from "../../hooks/useLocalFSWithHistory";
import AppSideBar from "../../components/AppSideBar";
import MainContent from "./MainContent";

import {
  StyledBottomBar,
  StyledFileBrowser,
  StyledTopBar,
  StyledTopBarButton,
  StyledTopBarButtons,
  StyledTopBarPath,
} from "./styles";
import useSystemSettings from "../../stores/systemSettingsStore";
import { BorderedAppContentHandles } from "../../components/BorderedApp/BorderedApp";

const defaultPath = "/home/user";

interface FileBrowserProps {
  path?: string;
}
export type FileBrowserHandles = BorderedAppContentHandles<HTMLDivElement>;

interface TopBarProps {
  pathSearch: string;
  onPathInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPathInputSubmit: (e: React.KeyboardEvent) => void;
  navForward: () => void;
  navBack: () => void;
}
function TopBar({
  pathSearch,
  onPathInputChange,
  onPathInputSubmit,
  navForward,
  navBack,
}: TopBarProps) {
  const [backgroundColor, fontColor] = useSystemSettings((s) => [
    s.accentColor,
    s.fontColor,
  ]);
  return (
    <StyledTopBar>
      <StyledTopBarButtons>
        <StyledTopBarButton onClick={navBack}>←</StyledTopBarButton>
        <StyledTopBarButton onClick={navForward}>→</StyledTopBarButton>
      </StyledTopBarButtons>
      <StyledTopBarPath
        value={pathSearch}
        onChange={onPathInputChange}
        onKeyDown={onPathInputSubmit}
        backgroundColor={backgroundColor}
        color={fontColor}
      />
    </StyledTopBar>
  );
}

const FileBrowser = forwardRef<FileBrowserHandles, FileBrowserProps>(
  ({ path = defaultPath }, ref) => {
    const fs = useLocalFSWithHistory(path);
    const appRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      onParentKeyDown() {},
      element: appRef.current,
    }));

    const [pathSearch, setPathSearch] = useState<string>(
      fs.currentDirectory.path,
    );

    useEffect(() => {
      setPathSearch(fs.currentDirectory.path);
    }, [fs.currentDirectory]);

    function onPathInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      setPathSearch(e.currentTarget.value);
    }

    function onPathInputSubmit(e: React.KeyboardEvent) {
      if (e.code === "Enter") {
        fs.navToPath(pathSearch);
      }
    }

    return (
      <StyledFileBrowser ref={appRef}>
        <TopBar
          pathSearch={pathSearch}
          onPathInputChange={onPathInputChange}
          onPathInputSubmit={onPathInputSubmit}
          navBack={fs.navBack}
          navForward={fs.navForward}
        />

        <AppSideBar
          items={fs.favorites.map((fav) => ({
            title: fs.getNameFromPath(fav) ?? "",
            isActive: fav === fs.currentDirectory.path,
            onClick: () => fs.navToPath(fav),
          }))}
        />

        <MainContent
          currentDirectory={fs.currentDirectory}
          openFSObject={fs.navToObject}
          appRef={appRef}
        />
        <StyledBottomBar />
      </StyledFileBrowser>
    );
  },
);

export default FileBrowser;
