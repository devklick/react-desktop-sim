import { useRef } from "react";
import Launcher from "../../../components/BottomBar/Launcher";
import Calendar from "../Calendar";
import { CalculatorHandles } from "../../Calculator/Calculator";

interface CalendarLauncherProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CalendarLauncher(_props: CalendarLauncherProps) {
  const ref = useRef<CalculatorHandles>(null);
  return (
    <Launcher
      windowType={"calendar"}
      WindowTitle="Calendar"
      initialDimensions={{ height: 500, width: 500 }}
      menus={[]}
      appContent={<Calendar />}
      icon=""
      contentRef={ref}
    />
  );
}

export default CalendarLauncher;
