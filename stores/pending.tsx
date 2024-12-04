import { create } from "zustand";

interface InitialState {
  isPending: boolean;
}

interface InitialAction {
  setIsPending(pending: boolean): void;
}

export const usePending = create<InitialState & InitialAction>()((set) => ({
  isPending: false,
  setIsPending: (pending: boolean) => set({ isPending: pending }),
}));
