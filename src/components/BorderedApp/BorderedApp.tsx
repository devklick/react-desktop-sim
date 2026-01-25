import React, { KeyboardEvent, RefObject, useCallback, useRef } from "react";
import useWindowManagerStore, {
  BaseProps,
} from "../../stores/windowManagerStore";
import { Dimensions, Position } from "../../hooks/useDragToResize";
import BorderedAppMenu from "./BorderedAppMenu/BorderedAppMenu";
import usePositionableElement from "../../hooks/usePositionableElement";
import useSystemSettings from "../../stores/systemSettingsStore";
import { MenuItemProps } from "../MenuItems";

import {
  StyledBorderedApp,
  StyledCorner,
  StyledContent,
  StyledEdge,
  StyledTitleBar,
  StyledTitleWrapper,
  StyledWindowButton,
  StyledWindowButtons,
  StyledWindowButtonsWrapper,
  StyledWindowMenus,
  StyledWindowMenusWrapper,
  StyledContentInner,
} from "./styles";

/**
 * A type for each of the programs wrapped in a bordered app to forward a ref for,
 * allowing the bordered all to communicate with the inner app content.
 */
export interface BorderedAppContentHandles<T extends HTMLElement> {
  /**
   * Function for the app content (such as calculator, calendar etc) to implement
   * and handle keyDown events that fire from the bordered app.
   */
  onParentKeyDown(e: React.KeyboardEvent): void;
  /**
   * A reference to the app content's main element.
   */
  element?: T | null;
}

interface BorderedAppProps<
  T extends BorderedAppContentHandles<E>,
  E extends HTMLElement = HTMLElement,
> extends BaseProps {
  title: string;
  type: string;
  id: string;
  initialDimensions: Dimensions;
  initialPosition: Position;
  maxDimensions?: Dimensions;
  minDimensions?: Dimensions;
  menus?: Array<MenuItemProps>;
  contentRef: RefObject<T>;
}

function BorderedApp<
  E extends HTMLElement,
  T extends BorderedAppContentHandles<E>,
>({
  title,
  type,
  id,
  children,
  initialDimensions,
  initialPosition,
  minDimensions = { height: 350, width: 350 },
  maxDimensions,
  menus,
  zIndex,
  hidden,
  contentRef,
}: React.PropsWithChildren<BorderedAppProps<T, E>>) {
  const winMan = useWindowManagerStore();
  const settings = useSystemSettings();

  // Listen for keyDown events and send them down to the content rendered inside the bordered app
  const handleKeyDown = (e: KeyboardEvent) =>
    contentRef.current?.onParentKeyDown(e);

  // Need a ref to point to the app for moving it around the screen
  const appRef = useRef<HTMLDivElement | null>(null);

  const onAppRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      appRef.current = element;
      appRef.current.focus();
    } else {
      appRef.current = null;
    }
  }, []);

  const {
    resizeHandleN,
    resizeHandleNE,
    resizeHandleE,
    resizeHandleSE,
    resizeHandleS,
    resizeHandleSW,
    resizeHandleW,
    resizeHandleNW,
    moveHandle,
    maximize,
    minimize,
  } = usePositionableElement({
    elementRef: appRef,
    minDimensions,
    maxDimensions,
    initialPosition,
    windowType: type,
    windowId: id,
  });

  function onClickClose() {
    winMan.closeWindow(type, id);
  }

  return (
    <StyledBorderedApp
      ref={onAppRef}
      onMouseDown={() => winMan.focusWindow(type, id)}
      initialDimensions={initialDimensions}
      initialPosition={initialPosition}
      zIndex={zIndex}
      backgroundColor={settings.mainColor}
      display={hidden === true ? "none" : "grid"}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <StyledCorner location="nw" ref={resizeHandleNW} />
      <StyledEdge location="n" ref={resizeHandleN} />
      <StyledCorner location="ne" ref={resizeHandleNE} />
      <StyledEdge location="e" ref={resizeHandleE} />
      <StyledTitleBar
        className="drag-to-move"
        ref={moveHandle}
        onDoubleClick={maximize}
      >
        <StyledWindowMenusWrapper className="drag-to-move">
          <StyledWindowMenus className="drag-to-move">
            {menus?.map((m) => (
              <BorderedAppMenu
                appRef={appRef}
                title={m.title}
                items={m.items ?? []}
                key={m.title}
              />
            ))}
          </StyledWindowMenus>
        </StyledWindowMenusWrapper>
        <StyledTitleWrapper className="drag-to-move">
          <span className="drag-to-move">{title}</span>
        </StyledTitleWrapper>
        <StyledWindowButtonsWrapper className="drag-to-move">
          <StyledWindowButtons>
            <StyledWindowButton
              buttonType="min"
              onClick={minimize}
            ></StyledWindowButton>
            <StyledWindowButton
              buttonType="max"
              onClick={maximize}
            ></StyledWindowButton>
            <StyledWindowButton
              buttonType="close"
              onClick={onClickClose}
            ></StyledWindowButton>
          </StyledWindowButtons>
        </StyledWindowButtonsWrapper>
      </StyledTitleBar>
      <StyledContent className="bordered-app__content">
        <StyledContentInner className="bordered-app__content-inner">
          {children}
        </StyledContentInner>
      </StyledContent>
      <StyledCorner location="sw" ref={resizeHandleSW} />
      <StyledEdge location="s" ref={resizeHandleS} />
      <StyledCorner location="se" ref={resizeHandleSE} />
      <StyledEdge location="w" ref={resizeHandleW} />
    </StyledBorderedApp>
  );
}

export default BorderedApp;
