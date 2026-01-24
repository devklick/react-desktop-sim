import { MutableRefObject, useEffect, useRef } from "react";
import useWindowManagerStore from "../stores/windowManagerStore";
import { Dimensions, Rect } from "./useDragToResize";

function toPx(value: number) {
  return `${value}px`;
}

interface UseWindowMinMaxProps {
  windowRef: React.RefObject<HTMLElement>;
  windowRect: MutableRefObject<Partial<Rect>>;
  maxDimensions?: Dimensions;
  windowType: string;
  windowId: string;
}
function useWindowMinMax({
  windowRect,
  windowRef,
  windowId,
  windowType,
  maxDimensions,
}: UseWindowMinMaxProps) {
  const winMan = useWindowManagerStore();
  const oldTransition = useRef<string>("");
  const oldTransform = useRef<string>("");
  const oldOpacity = useRef<string>("");

  function maximize() {
    const boundary = winMan.contentRef.current?.getBoundingClientRect();
    const window = windowRef.current;
    if (!boundary || !window) return;

    // If the window/app being maximised has max dimensions set (present via maxDimensions prop)
    // then we'll leave it's anchor (top/left) in the current position and just
    // increase the width and height to the max allowed values
    if (maxDimensions) {
      windowRect.current.width = maxDimensions.width;
      windowRect.current.height = maxDimensions.height;
      window.style.width = toPx(maxDimensions.width);
      window.style.height = toPx(maxDimensions.height);
    } else {
      // For windows/apps that do not have a max set, we max them to fill the main content area
      windowRect.current.top = boundary.y;
      windowRect.current.left = boundary.x;
      windowRect.current.width = boundary.width;
      windowRect.current.height = boundary.height;

      window.style.top = toPx(boundary.y);
      window.style.left = toPx(boundary.x);
      window.style.width = toPx(boundary.width);
      window.style.height = toPx(boundary.height);
    }
  }

  function minimize() {
    const window = windowRef.current;
    if (!window) return;

    oldTransition.current = window.style.transition;
    oldTransform.current = window.style.transform;
    oldOpacity.current = window.style.opacity;

    // TODO: this is a crap animation and could deffo be improved.
    // Consider using gsap, motion etc to do something a little nicer.
    window.style.transition = "all 0.2s linear";
    window.style.opacity = "0";
    window.style.transform = "scale(0.2) translate(0, 500%)";

    window.addEventListener("transitionend", handleTransitionEnd);
  }

  function handleTransitionEnd(e: TransitionEvent) {
    const window = windowRef.current;
    if (!window?.style) return;
    if (e.target !== window) return;
    winMan.hideWindow(windowType, windowId);

    window.style.transition = oldTransition.current;
    window.style.transform = oldTransform.current;
    window.style.opacity = oldOpacity.current;
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("transitionend", handleTransitionEnd);
    };
  });

  return {
    maximize,
    minimize,
  };
}

export default useWindowMinMax;
