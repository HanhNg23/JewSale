import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const storeApi = (set) => ({
  isRefecth: false,
  refetch: () => set((state) => ({ isRefecth: !state.isRefecth })),
});

export const useAppStore = create()(
  devtools(persist(storeApi, { name: "app-storage" }))
);
