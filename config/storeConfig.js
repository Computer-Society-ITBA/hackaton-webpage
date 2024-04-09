import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      role: undefined,
      userInfo: undefined,
      token: undefined,
      inscriptions: undefined,
      submissions: undefined,
      inscriptionsEnabled: undefined,
      submissionsEnabled: undefined,
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
      setConfig: async () => {
        let config;
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/config`
          );
          config = await response.json();
        } catch (e) {
          config = {
            inscriptionsEnabled: false,
            submissionsEnabled: false,
          };
        }

        set((state) => ({
          inscriptionsEnabled: config.inscriptions?.enabled,
          submissionsEnabled: config.submissions?.enabled,
          inscriptions: config.inscriptions,
          submissions: config.submissions,
        }));
      },
    }),
    {
      name: "session-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useStore;
