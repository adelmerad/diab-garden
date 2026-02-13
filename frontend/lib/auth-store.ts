import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  token: string | null;
  setToken: (newToken: string) => void;
  removeToken: () => void;
};

const DEV_TEST_TOKEN = null;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: DEV_TEST_TOKEN,

      setToken: (token) => set({ token: token }),

      removeToken: () => set({ token: null }),
    }),
    {
      name: "auth_store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
