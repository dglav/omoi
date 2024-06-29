import { weekEnd, weekStart } from "@formkit/tempo";
import { create } from "zustand";

interface State {
  user: "me" | "partner";
  startDate: Date;
  endDate: Date;
}

interface Actions {
  setUser: (user: State["user"]) => void;
}

const now = new Date();

export const useAnalysisScreenStore = create<State & Actions>((set) => ({
  user: "me",
  startDate: weekStart(now, 1),
  endDate: weekEnd(now, 1),

  setUser: ((user: "me" | "partner") => set({ user })),
}));
