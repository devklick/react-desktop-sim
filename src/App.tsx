import { Global, css } from "@emotion/react";

import Desktop from "./components/Desktop";
import useSystemSettings from "./stores/systemSettingsStore";

function App() {
  const fontColor = useSystemSettings((s) => s.fontColor);
  return (
    <div className="App">
      <Global
        styles={css`
          body {
            color: ${fontColor};
          }
        `}
      />
      <Desktop />
    </div>
  );
}

export default App;
