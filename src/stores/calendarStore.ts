import { create } from "zustand";
import {
  getSpannedDays,
  toLocalISODateString,
} from "../common/utils/dateUtils";

interface CalendarEvent {
  id: string;
  title: string;
  detail: string;
  start: Date;
  end: Date;
}

interface CalendarStoreState {
  /**
   * Events mapped by their ID.
   */
  events: Record<string, CalendarEvent>;
  /**
   * A map between dates and events that appear on the date. The key is the date in `YYYY-MM-DD` format,
   * and the value is an array of one or more event IDs.
   *
   * **Note:** This data is derived from `events` and should not be mutated directly.
   * Changes to this field are managed entirely within the store.
   */
  _eventIdsByDay: Record<string, string[]>;
  addEvent(event: CalendarEvent): void;
  removeEvent(id: string): void;
  updateEvent(event: CalendarEvent): void;
}

export const useCalendarStore = create<CalendarStoreState>()((set, get) => ({
  events: {},
  _eventIdsByDay: {},
  addEvent(event) {
    set((state) => {
      const events = { ...state.events };
      const eventIdsByDay = { ...state._eventIdsByDay };
      events[event.id] = event;

      for (const day of getSpannedDays(event.start, event.end)) {
        const key = toLocalISODateString(day);
        eventIdsByDay[key] = [...(eventIdsByDay[key] ?? []), event.id];
      }

      return { events, _eventIdsByDay: eventIdsByDay };
    });
  },
  removeEvent(id) {
    set((state) => {
      if (!state.events[id]) return {};
      const events = { ...state.events };
      const event = state.events[id];
      delete events[id];

      const eventIdsByDay = { ...state._eventIdsByDay };

      for (const day of getSpannedDays(event.start, event.end)) {
        const key = toLocalISODateString(day);
        if (!eventIdsByDay[key] || !eventIdsByDay[key].includes(id)) continue;
        const eventIds = eventIdsByDay[key].filter((eventId) => eventId !== id);
        eventIdsByDay[key] = eventIds;

        if (!eventIdsByDay[key].length) {
          delete eventIdsByDay[key];
        }
      }

      return { events, _eventIdsByDay: eventIdsByDay };
    });
  },
  updateEvent(event) {
    if (!get().events[event.id]) {
      get().addEvent(event);
      return;
    }
    set((state) => {
      // the updated event may span different days.
      // we could be smarter/more performant about this, but
      // lets just be lazy and clear the _eventIdsByDay for
      // the current range and add them for the new range.

      const id = event.id;
      const events = { ...state.events };
      const eventIdsByDay = { ...state._eventIdsByDay };
      events[id] = event;

      for (const day of getSpannedDays(event.start, event.end)) {
        const key = toLocalISODateString(day);
        if (!eventIdsByDay[key] || !eventIdsByDay[key].includes(id)) continue;
        const eventIds = eventIdsByDay[key].filter((eventId) => eventId !== id);
        eventIdsByDay[key] = eventIds;

        if (!eventIdsByDay[key].length) {
          delete eventIdsByDay[key];
        }
      }

      for (const day of getSpannedDays(event.start, event.end)) {
        const key = toLocalISODateString(day);
        eventIdsByDay[key] = [...(eventIdsByDay[key] ?? []), event.id];
      }

      return { _eventIdsByDay: eventIdsByDay, events };
    });
  },
}));
