import { create } from "zustand";

type RuleState = {
  title: string;
  setTitle: (newTitle: string) => void;
  rule: string;
  setRule: (newRule: string) => void;
  init: number;
  setInit: (newInit: number) => void;
};

export const useRuleStore = create<RuleState>((set) => ({
  title: "BG_",
  setTitle: (newTitle) => set({ title: newTitle }),
  rule: "type-2",
  setRule: (newRule) => set({ rule: newRule }),
  init: 1,
  setInit: (newInit) => set({ init: newInit }),
}));
