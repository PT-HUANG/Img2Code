import { create } from "zustand";

type ModeState = {
  filterMode: string;
  setFilterMode: (arg: string) => void;
};

export const useFilterModeStore = create<ModeState>((set) => ({
  filterMode: "all",
  setFilterMode: (mode: string) => set({ filterMode: mode }),
}));
