import { debouncedFunctions } from "@/services/styleGuideService";
import { create } from "zustand";
import useAuthStore from "./AuthStore";
import { useUploadedStyleGuideStore } from "./useUploadedStyleGuideStore";

export type ColorPalette = {
    primary: string[];
    accents: string[];
    neutral: string[];
};

export type ColorPaletteKey = keyof ColorPalette;

const defaultColorPalette: ColorPalette = {
    primary: ["#F1B000"],
    accents: ["#232F34", "#125FCA"],
    neutral: ["#D9D9D9", "#303030", "#FFFFFF"],
};

interface ColorPaletteStore {
    activePalette: { name: ColorPaletteKey; index: number } | null;
    setActivePalette: (palette: ColorPaletteKey, index: number) => void;
    palette: ColorPalette;
    setPalette: (
        palette: ColorPaletteKey,
        index: number,
        color: string
    ) => void;
    resetPalette: () => void;
}

export const useColorPaletteStore = create<ColorPaletteStore>((set) => ({
    activePalette: null,
    setActivePalette: (palette: ColorPaletteKey, index: number) =>
        set(() => ({
            activePalette: { name: palette, index },
        })),
    palette: defaultColorPalette,
    setPalette: (palette: ColorPaletteKey, index: number, color: string) => {
        set((state) => {
            const selectedPalette = state.palette[palette];

            if (selectedPalette && selectedPalette[index] !== color) {
                const updatedPalette = [...selectedPalette];
                updatedPalette[index] = color;

                const fullUpdatedPalette = {
                    ...state.palette,
                    [palette]: updatedPalette,
                };

                const hasChange =
                    JSON.stringify(state.palette) !==
                    JSON.stringify(fullUpdatedPalette);

                if (hasChange) {
                    const userId = useAuthStore.getState().user?.user_id;
                    const styleGuideId =
                        useUploadedStyleGuideStore.getState()
                            .currentlyDisplayingStyleGuide?.styleguide_id;

                    if (userId && styleGuideId) {
                        debouncedFunctions.colors(
                            fullUpdatedPalette,
                            userId!,
                            styleGuideId!
                        );
                    }

                    return {
                        palette: fullUpdatedPalette,
                    };
                }
                return state;
            }

            return state;
        });
    },
    resetPalette: () =>
        set(() => ({
            palette: defaultColorPalette,
        })),
}));
