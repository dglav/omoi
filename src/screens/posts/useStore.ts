import { create } from "zustand";

const defaultState: State = {
  condition: "average",
  feelings: [],
  tags: [],
  note: "",
  date: new Date(),
};

type State = {
  condition: "reallyBad" | "bad" | "average" | "good" | "reallyGood";
  feelings: string[];
  tags: string[];
  note: string;
  date: Date;
};

type Actions = {
  setCondition: (newCondition: State["condition"]) => void;
  addFeeling: (newFeeling: string) => void;
  removeFeeling: (feeling: string) => void;
  addTag: (newTag: string) => void;
  removeTag: (tag: string) => void;
  updateNote: (updatedNote: string) => void;
  setDate: (updatedDate: Date) => void;
  resetAll: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  condition: "average",
  setCondition: (newCondition) => set({ condition: newCondition }),

  feelings: [],
  addFeeling: (newfeeling: string) =>
    set((state) => ({ feelings: state.feelings.concat([newfeeling]) })),
  removeFeeling: (feeling: string) =>
    set((state) => ({
      feelings: state.feelings.filter((_feeling) => _feeling !== feeling),
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

  resetAll: () => set(defaultState),
}));