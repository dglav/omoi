import { create } from "zustand";

import { EmotionLevel } from "../../../services/supabase/database/custom_feelings/converter";

export type FeelingState = {
  name?: string;
  emotionLevel?: EmotionLevel;
};

type Actions = {
  setName: (name: string) => void;
  setEmotionLevel: (emotionLevel: EmotionLevel) => void;
};

export const useStore = create<FeelingState & Actions>((set) => ({
  name: undefined,
  setName: (name) => set({ name }),

  emotionLevel: undefined,
  setEmotionLevel: (emotionLevel) => set({ emotionLevel }),
}));
