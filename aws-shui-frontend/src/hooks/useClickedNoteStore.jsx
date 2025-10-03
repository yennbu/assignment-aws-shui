import { create } from "zustand";
import { persist } from "zustand/middleware";

const useClickedNoteStore = create(
    persist(
        (set) => ({
            clickedNote: null,
            setClickedNote: (note) => set({ clickedNote: note }),
            clearClickedNote: () => set({ clickedNote: null }),
        }),
        {
            name: "clicked-note-storage", // key i localStorage
        }
    )
);

export default useClickedNoteStore;
