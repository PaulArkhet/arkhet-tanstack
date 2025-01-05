import { create } from "zustand";
import { SGFetchData } from "@/utils/styleGuideUtils";

interface UploadedStyleGuideStore {
    currentlyDisplayingStyleGuide: SGFetchData | null;
    updateCurrentlyDisplayingStyleGuide: (
        styleGuide: SGFetchData | null
    ) => void;
}

export const useUploadedStyleGuideStore = create<UploadedStyleGuideStore>(
    (set) => ({
        currentlyDisplayingStyleGuide: null,
        updateCurrentlyDisplayingStyleGuide: (styleGuide: SGFetchData | null) =>
            set({ currentlyDisplayingStyleGuide: styleGuide }),
    })
);
