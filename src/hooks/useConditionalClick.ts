import React, { useCallback, useEffect, useRef } from "react";

type EventHandlerMap =
  | { type: "click" | "contextmenu"; handler: (e: MouseEvent) => void }
  | { type: "keydown" | "keyup"; handler: (e: KeyboardEvent) => void };

interface UseConditionalClickProps<Element extends HTMLElement> {
  /**
   * Whether the `clickHandler` should be invoked on right click, left click,
   * or either of these.
   */
  mouseButton: "left" | "right" | "either";

  /**
   * Allows you to specify modifiers keys so that the `clickHandler` will only
   * be invoked when the specified `mouseButton` is clicked while *all* of the
   * keyboard modifier keys are also pressed.
   */
  modifierKeys?: Array<string>;

  /**
   * The function to be invoked when a matching click is detected.
   */
  clickHandler: (event: MouseEvent) => void;

  /**
   * A reference to the element on which click events should be listened to.
   */
  elementRef?: React.RefObject<Element> | null;
}

/**
 * Allows either left click or right click to be handled only when the specified
 * modifier keys are also pressed.
 */
function useConditionalClick<Element extends HTMLElement>({
  mouseButton,
  modifierKeys,
  clickHandler,
  elementRef,
}: UseConditionalClickProps<Element>) {
  const keysDown = useRef(new Set<string>());

  const defaultRef = useRef<Element>(null);

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (modifierKeys) {
        for (const key of modifierKeys) {
          if (!keysDown.current.has(key)) return;
        }
      }
      clickHandler(e);
    },
    [clickHandler, modifierKeys]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (modifierKeys?.includes(e.code)) {
        keysDown.current.add(e.code);
      }
    },
    [modifierKeys]
  );

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    keysDown.current.delete(e.code);
  }, []);

  useEffect(() => {
    const ref = elementRef ? elementRef?.current : defaultRef?.current;

    if (!ref) return;

    const events: Array<EventHandlerMap> = [
      { type: "keydown", handler: onKeyDown },
      { type: "keyup", handler: onKeyUp },
    ];

    switch (mouseButton) {
      case "either":
        events.push({ type: "click", handler: onClick });
        events.push({ type: "contextmenu", handler: onClick });
        break;
      case "left":
        events.push({ type: "click", handler: onClick });
        break;
      case "right":
        events.push({ type: "contextmenu", handler: onClick });
        break;
    }

    events.forEach(({ type, handler }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ref.addEventListener(type, handler);
    });

    return () => {
      events.forEach(({ type, handler }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ref.removeEventListener(type, handler);
      });
    };
  }, [clickHandler, elementRef, mouseButton, onClick, onKeyDown, onKeyUp]);

  return {
    ref: elementRef ?? defaultRef,
  };
}

export default useConditionalClick;
