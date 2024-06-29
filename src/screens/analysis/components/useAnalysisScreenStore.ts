import { addDay, weekEnd, weekStart } from "@formkit/tempo";
import { create } from "zustand";

interface State {
  user: "me" | "partner";
  startDate: Date;
  endDate: Date;
}

interface Actions {
  setUser: (user: State["user"]) => void;
  goBackOneWeek: () => void;
  goForwardOneWeek: () => void;
}

const now = new Date();

export const useAnalysisScreenStore = create<State & Actions>((set) => ({
  user: "me",
  startDate: weekStart(now, 1),
  endDate: weekEnd(now, 1),

  setUser: ((user: "me" | "partner") => set({ user })),
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
