import { toLocalISODateString } from "../../../common/utils/dateUtils";
import { useCalendarStore } from "../../../stores/calendarStore";

interface UseCalendarEventsParams {
  date: Date;
}

export default function useCalendarEvents({ date }: UseCalendarEventsParams) {
  return useCalendarStore((state) => {
    const ids = state._eventIdsByDay[toLocalISODateString(date)];
    return ids?.map((id) => state.events[id]).filter(Boolean) ?? [];
  });
}
