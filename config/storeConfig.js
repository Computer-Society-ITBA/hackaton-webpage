import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const useStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      role: undefined,
      userInfo: undefined,
      token: undefined,
      setToken: (token) => set((state) => ({ token: token })),
      signIn: (userInfo, token) =>
        set((state) => ({
          isLoggedIn: true,
          role: userInfo?.role,
          userInfo: userInfo,
          token: token,
        })),
      logout: () =>
        set((state) => ({
          isLoggedIn: false,
          role: undefined,
          userInfo: undefined,
          token: undefined,
        })),
    }),
    {
      name: "session-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
module.exports = { useStore };
