import { RefObject } from "react";
import { StyledIcon, StyledLauncher } from "./styles";
import { MenuItemProps } from "../../MenuItems";
import ContextMenu from "../../ContextMenu";
import { Position } from "../../../hooks/useDragToResize";

interface ContextMenuViewProps {
  close(): void;
  items: Array<MenuItemProps>;
}

interface LauncherViewProps {
  launcherRef: RefObject<HTMLDivElement>;
  icon: string;
  windowType: string;
  contextMenu?: ContextMenuViewProps;
}

export default function LauncherView({
  launcherRef,
  icon,
  windowType,
  contextMenu,
}: LauncherViewProps) {
  function getContextPosition(numberOfItems: number): Position {
    const rect = launcherRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: rect.x,
      y: rect.y - 20 - numberOfItems * 30,
    };
  }
  return (
    <>
      {contextMenu && (
        <ContextMenu
          close={contextMenu.close}
          items={contextMenu.items}
          position={getContextPosition(contextMenu.items.length)}
        />
      )}
      <StyledLauncher ref={launcherRef} tabIndex={1} className="launcher">
        <StyledIcon src={icon} className="launcher-icon" alt={windowType} />
      </StyledLauncher>
    </>
  );
}
