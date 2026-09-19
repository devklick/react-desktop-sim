import { useRef, useState } from "react";
import LauncherView from "../../components/BottomBar/Launcher/LauncherView";
import useConditionalClick from "../../hooks/useConditionalClick";

import icon from "./GithubIcon.svg";
import { MenuItemProps } from "../../components/MenuItems";

export default function GithubLauncher() {
  const ref = useRef<HTMLDivElement>(null);
  const [contextOpen, setContextOpen] = useState(false);
  function onLeftClick() {
    open("https://github.com/devklick/react-desktop-sim", "_blank");
  }
  function onRightClick() {
    setContextOpen(true);
  }
  useConditionalClick({
    mouseButton: "left",
    elementRef: ref,
    clickHandler: onLeftClick,
  });

  useConditionalClick({
    mouseButton: "right",
    elementRef: ref,
    clickHandler: onRightClick,
  });

  const contextMenuItems: Array<MenuItemProps> = [
    {
      title: "Go to Repository",
      action: onLeftClick,
    },
  ];
  return (
    <LauncherView
      icon={icon}
      launcherRef={ref}
      windowType="Github"
      contextMenu={
        contextOpen
          ? {
              items: contextMenuItems,
              close: () => setContextOpen(false),
            }
          : undefined
      }
    />
  );
}
