import Calculator from "..";
import Launcher from "../../../components/BottomBar/Launcher";

interface CalculatorLauncherProps {}

const windowType = "calculator";

// eslint-disable-next-line no-empty-pattern
function CalculatorLauncher({}: CalculatorLauncherProps) {
  return (
    <Launcher
      windowType={windowType}
      WindowTitle="Calculator"
      // TODO: Consider supoprting an `allowResize` prop, instead of having to repeat the initial dimensions for both min and max
      initialDimensions={{ height: 400, width: 400 }}
      maxDimensions={{ height: 400, width: 400 }}
      minDimensions={{ height: 400, width: 400 }}
      icon=""
      menus={[]}
      appContent={<Calculator />}
    />
  );
}

export default CalculatorLauncher;
