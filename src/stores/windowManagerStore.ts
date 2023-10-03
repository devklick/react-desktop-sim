import React, { ReactNode, createRef } from "react";
import { create } from "zustand";

interface WindowManagerStoreState {
  /**
   * A map of all windows.
   * The key is the type of window, and the value is another map.
   * The key of the nested map is the ID of the window, and the value
   * is the window JSX element.
   */
  windowsMap: Map<string, Map<string, ReactNode>>;
  getWindows: () => Array<ReactNode>;
  addWindow: (windowType: string, windowId: string, window: ReactNode) => void;
  closeWindow: (windowType: string, windowId: string) => void;
  contentRef: React.RefObject<HTMLDivElement>;
}
const useWindowManagerStore = create<WindowManagerStoreState>()((set, get) => ({
  windowsMap: new Map(),
  getWindows() {
    return Array.from(get().windowsMap.values()).flatMap((map) =>
      Array.from(map.values())
    );
  },
  contentRef: createRef<HTMLDivElement>(),
  addWindow(windowType, windowId, window) {
    console.debug("Adding window", windowType, windowId);
    const windowsMap = get().windowsMap;
    const windowsOfType = windowsMap.get(windowType);

    if (!windowsOfType) {
      console.log("No windows of type", windowType, ", adding first...");
      windowsMap.set(windowType, new Map([[windowId, window]]));
    } else {
      console.log("Found windows of type", windowType, ", adding another...");
      windowsOfType.set(windowId, window);
    }

    set({ windowsMap });
  },
  closeWindow(windowType, windowId) {
    const windowsMap = get().windowsMap;
    const windowsOfType = windowsMap.get(windowType);
    if (windowsOfType) {
      windowsOfType.delete(windowId);
    }
    set({ windowsMap });
  },
}));

export default useWindowManagerStore;
