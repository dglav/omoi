import { addDay, weekEnd, weekStart } from "@formkit/tempo";
import { create } from "zustand";

interface State {
  startDate: Date;
  endDate: Date;
}

interface Actions {
  goBackOneWeek: () => void;
  goForwardOneWeek: () => void;
}

const now = new Date();

export const useAnalysisScreenStore = create<State & Actions>((set) => ({
  startDate: weekStart(now, 1),
  endDate: weekEnd(now, 1),

  goBackOneWeek: () =>
    set(({ startDate, endDate }) => ({
      startDate: addDay(startDate, -7),
      endDate: addDay(endDate, -7),
    })),
  goForwardOneWeek: () =>
    set(({ startDate, endDate }) => ({
      startDate: addDay(startDate, 7),
      endDate: addDay(endDate, 7),
    })),
}));
