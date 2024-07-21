import { create } from "zustand";

import { Feeling } from "../../../services/supabase/database/custom_feelings/converter";

export type Post = {
  condition: "reallyBad" | "bad" | "average" | "good" | "reallyGood";
  feelings: Feeling[];
  tags: string[];
  note: string;
  date: Date;
  isPrivate: boolean;
};

const defaultState: Post = {
  condition: "average",
  feelings: [],
  tags: [],
  note: "",
  date: new Date(),
  isPrivate: false,
};

type Actions = {
  setCondition: (newCondition: Post["condition"]) => void;
  addFeeling: (newFeeling: Feeling) => void;
  removeFeeling: (feelingId: string) => void;
  addTag: (newTag: string) => void;
  removeTag: (tag: string) => void;
  updateNote: (updatedNote: string) => void;
  setDate: (updatedDate: Date) => void;
  resetAll: () => void;
  resetTo: (newState: Post) => void;
  setIsPrivate: (isPrivate: boolean) => void;
};

export const useStore = create<Post & Actions>((set) => ({
  condition: "average",
  setCondition: (newCondition) => set({ condition: newCondition }),

  feelings: [],
  addFeeling: (newfeeling) =>
    set((state) => ({ feelings: state.feelings.concat([newfeeling]) })),
  removeFeeling: (feelingId) =>
    set((state) => ({
      feelings: state.feelings.filter((_feeling) => _feeling.id !== feelingId),
    })),

  tags: [],
  addTag: (newTag: string) =>
    set((state) => ({ tags: state.tags.concat([newTag]) })),
  removeTag: (tag: string) =>
    set((state) => ({
      tags: state.tags.filter((_tag) => _tag !== tag),
    })),

  note: "",
  updateNote: (updatedNote: string) => set({ note: updatedNote }),

  date: new Date(),
  setDate: (updatedDate) => set({ date: updatedDate }),

  resetAll: () => {
    return set({ ...defaultState, date: new Date() });
  },

  resetTo: (newState: Post) => {
    return set(newState);
  },

  isPrivate: false,
  setIsPrivate: (isPrivate) => {
    return set({ isPrivate });
  },
}));
