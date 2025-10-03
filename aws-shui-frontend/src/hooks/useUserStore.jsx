import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist( //zustand sparar ner inlogg i localStorage
        (set) => ({
            user: null,
            isLoggedIn: false,
            login: (user) => set({ user, isLoggedIn: true }),
            logout: () => set({ user: null, isLoggedIn: false }),
        }),
        {
            name: "user-storage",
        }
    )
);

export default useUserStore;

