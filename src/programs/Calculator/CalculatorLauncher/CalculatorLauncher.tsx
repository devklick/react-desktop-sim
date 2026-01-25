import { useRef } from "react";
import Launcher from "../../../components/BottomBar/Launcher";
import { Calculator, CalculatorHandles } from "../Calculator";

interface CalculatorLauncherProps {}

const windowType = "calculator";

// eslint-disable-next-line no-empty-pattern
function CalculatorLauncher({}: CalculatorLauncherProps) {
  const ref = useRef<CalculatorHandles>(null);
  return (
    <Launcher
      windowType={windowType}
      WindowTitle="Calculator"
      // TODO: Consider supoprting an `allowResize` prop, instead of having to repeat the initial dimensions for both min and max
      initialDimensions={{ height: 400, width: 250 }}
      maxDimensions={{ height: 400, width: 250 }}
      minDimensions={{ height: 400, width: 250 }}
      icon=""
      menus={[]}
      appContent={<Calculator ref={ref} />}
      contentRef={ref}
    />
  );
}

export default CalculatorLauncher;
