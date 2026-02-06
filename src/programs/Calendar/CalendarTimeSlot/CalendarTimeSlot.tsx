import { useCallback, useRef } from "react";
import useSystemSettings from "../../../stores/systemSettingsStore";
import Button from "../../../components/Button";

interface CalendarTimeSlotProps {
  hour: number;
}

export default function CalendarTimeSlot({ hour }: CalendarTimeSlotProps) {
  const currentHour = useRef(new Date().getHours());
  const [backgroundColor, fontColor] = useSystemSettings((s) => [
    s.mainColor,
    s.fontColor,
  ]);

  const onRef = useCallback(
    (el: null | HTMLDivElement) => {
      if (el && hour === currentHour.current) {
        el.scrollIntoView();
      }
    },
    [currentHour, hour],
  );

  return (
    <Button
      height={"12%"}
      backgroundColor={backgroundColor}
      color={fontColor}
      justifyContent="start"
      ref={onRef}
      group="vertical"
      separators
    >
      {hour.toString().padStart(2, "0")}:00
    </Button>
  );
}
