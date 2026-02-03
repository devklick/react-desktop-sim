import { useRef } from "react";
import MenuItems, { MenuItemProps } from "../MenuItems";
import useDetectMouseDownOutside from "../../hooks/useDetectMouseDownOutside";

import { StyledContextMenu } from "./styles";
import useBindKeyToAction from "../../hooks/useBindKeyToAction";
import { createPortal } from "react-dom";
import useWindowManagerStore from "../../stores/windowManagerStore";

interface ContextMenuProps {
  items: Array<MenuItemProps>;
  position: { x: number; y: number };
  close: () => void;
}

function ContextMenu({ items, position, close }: ContextMenuProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useDetectMouseDownOutside({ elementRef, onMouseDown: close });
  useBindKeyToAction({ keys: ["Escape"], action: close });

  // Context menu portalled to the desktop element.
  const desktopRef = useWindowManagerStore((s) => s.desktopRef);
  if (!desktopRef.current) return;

  return createPortal(
    <StyledContextMenu
      position={position}
      ref={elementRef}
      className="context-menu"
    >
      <MenuItems
        items={items}
        position={{ x: 0, y: 0 }}
        positionType="relative"
      />
    </StyledContextMenu>,
    desktopRef.current,
  );
}

export default ContextMenu;
