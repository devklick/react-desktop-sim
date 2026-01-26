import { forwardRef, useImperativeHandle, useRef } from "react";
import { BorderedAppContentHandles } from "../../components/BorderedApp/BorderedApp";
import { StyledContents, StyledWebBrowser } from "./styles";

interface WebBrowserProps {}

export type WebBrowserHandles = BorderedAppContentHandles<HTMLDivElement>;

const WebBrowser = forwardRef<WebBrowserHandles, WebBrowserProps>(
  (_props, ref) => {
    const elementRef = useRef<HTMLDivElement>();
    useImperativeHandle(ref, () => ({
      element: elementRef.current,
    }));
    return (
      <StyledWebBrowser>
        <StyledContents src="http://google.com" />
      </StyledWebBrowser>
    );
  },
);

export default WebBrowser;
