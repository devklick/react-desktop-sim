import Launcher from "../../../components/BottomBar/Launcher";
import Calendar from "../Calendar";

interface CalendarLauncherProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CalendarLauncher(_props: CalendarLauncherProps) {
  return (
    <Launcher
      windowType={"calendar"}
      WindowTitle="Calendar"
      initialDimensions={{ height: 500, width: 500 }}
      menus={[]}
      appContent={<Calendar />}
      icon=""
    />
  );
}

export default CalendarLauncher;
