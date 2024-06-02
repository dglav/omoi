import { create } from "zustand";

export type TagState = {
  name?: string;
};

type Actions = {
  setName: (name: string) => void;
};

export const useStore = create<TagState & Actions>((set) => ({
  name: undefined,
  setName: (name) => set({ name }),
}));
