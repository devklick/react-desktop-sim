import { RefObject, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import useConditionalClick from "../../../hooks/useConditionalClick";
import useWindowManagerStore from "../../../stores/windowManagerStore";
import BorderedApp from "../../BorderedApp";
import { Dimensions } from "../../../hooks/useDragToResize";
import { MenuItemProps } from "../../MenuItems";

import { BorderedAppContentHandles } from "../../BorderedApp/BorderedApp";
import LauncherView from "./LauncherView";

interface LauncherProps<
  T extends BorderedAppContentHandles<E>,
  E extends HTMLElement = HTMLElement,
> {
  windowType: string;
  WindowTitle: string;
  windowId?: string;
  initialDimensions: Dimensions;
  minDimensions?: Dimensions;
  maxDimensions?: Dimensions;
  menus?: Array<MenuItemProps>;
  appContent: JSX.Element;
  icon: string;
  contentRef: RefObject<T>;
}

function Launcher<
  T extends BorderedAppContentHandles<E>,
  E extends HTMLElement = HTMLElement,
>({
  windowType,
  windowId,
  WindowTitle,
  initialDimensions,
  minDimensions,
  maxDimensions,
  menus,
  appContent,
  icon,
  contentRef,
}: React.PropsWithChildren<LauncherProps<T>>) {
  const winMan = useWindowManagerStore();
  const ref = useRef<HTMLDivElement>(null);
  const [contextOpen, setContextOpen] = useState(false);

  function addWindow() {
    const id = windowId ?? uuid();
    const boundingRect = winMan.contentRef.current?.getBoundingClientRect();
    function getInitialPosition(axis: "x" | "y"): number {
      if (!boundingRect) return 0;
      const dimension = axis === "x" ? "width" : "height";
      return (
        (boundingRect[axis] ?? 0) +
        (boundingRect[dimension] ?? 0) / 2 -
        initialDimensions[dimension] / 2
      );
    }
    winMan.addWindow(windowType, id, {
      component: BorderedApp,
      props: {
        id,
        title: WindowTitle,
        type: windowType,
        initialDimensions,
        minDimensions,
        maxDimensions,
        initialPosition: {
          x: getInitialPosition("x"),
          y: getInitialPosition("y"),
        },
        menus,
        contentRef,
      },
      key: id,
      children: appContent,
    });
  }
  function onLeftClick() {
    console.log("left click");
    // If there are one or more windows of this type open,
    // we want to focus them. This means revealing them if they
    // are minimized and bring them to the top of the window stack.
    if (winMan.windowsOfTypeExist(windowType)) {
      winMan.focusWindowsOfType(windowType);
      return;
    }

    // If there are no windows of this type, we want to add one.
    addWindow();
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
      title: "New Window",
      action: () => {
        addWindow();
        setContextOpen(false);
      },
    },
  ];
  return (
    <>
      <LauncherView
        icon={icon}
        launcherRef={ref}
        windowType={windowType}
        contextMenu={
          contextOpen
            ? {
                items: contextMenuItems,
                close: () => setContextOpen(false),
              }
            : undefined
        }
      />
    </>
  );
}

export default Launcher;
