import {
    FontStyles,
    TypographyElements,
    TypographyElementKey,
} from "@/types/typography-types";
import { create } from "zustand";
import useAuthStore from "./AuthStore";
import { useUploadedStyleGuideStore } from "./useUploadedStyleGuideStore";
import { debouncedFunctions } from "@/services/styleGuideService";

interface TypographyStore {
    customizationEnabledFont: boolean;
    setCustomizationFont: (enabled: boolean) => void;
    selectedFont: string;
    updateSelectedFont: (
        font: string,
        userId?: string,
        styleGuideId?: string
    ) => void;
    activeHeader: TypographyElementKey;
    updateActiveHeader: (header: TypographyElementKey) => void;
    typographyElements: TypographyElements;
    updateElementStyles: (
        element: TypographyElementKey,
        updatedStyles: Partial<FontStyles>
    ) => void;
    resetTypography: () => void;
}

export const useTypographyStore = create<TypographyStore>((set) => ({
    customizationEnabledFont: false,
    setCustomizationFont: (enabled: boolean) =>
        set({ customizationEnabledFont: enabled }),
    selectedFont: "Roboto",
    updateSelectedFont: (font: string) => {
        set((state) => {
            if (state.selectedFont !== font) {
                const userId = useAuthStore.getState().user?.user_id;
                const styleGuideId =
                    useUploadedStyleGuideStore.getState()
                        .currentlyDisplayingStyleGuide?.styleguide_id;

                debouncedFunctions.typography(font, userId!, styleGuideId!);

                return { selectedFont: font };
            }

            return state;
        });
    },
    activeHeader: "H1",
    updateActiveHeader: (value: TypographyElementKey) => {
        set({ activeHeader: value });
    },

    typographyElements: {
        H1: { size: "26px", weight: "700" },
        H2: { size: "24px", weight: "600" },
        H3: { size: "23px", weight: "500" },
        H4: { size: "20px", weight: "500" },
        H5: { size: "16px", weight: "400" },
        H6: { size: "14px", weight: "400" },
        Paragraph: { size: "14px", weight: "400" },
        Link: { size: "14px", weight: "400" },
    },
    updateElementStyles: (
        element: TypographyElementKey,
        styles: Partial<FontStyles>
    ) =>
        set((state) => {
            if (element && state.typographyElements[element]) {
                return {
                    typographyElements: {
                        ...state.typographyElements,
                        [element]: {
                            ...state.typographyElements[element],
                            ...styles,
                        },
                    },
                };
            }
            return state;
        }),
    resetTypography: () =>
        set({
            selectedFont: "Roboto",
            activeHeader: "",
            typographyElements: {
                H1: { size: "26px", weight: "700" },
                H2: { size: "24px", weight: "600" },
                H3: { size: "23px", weight: "500" },
                H4: { size: "20px", weight: "500" },
                H5: { size: "16px", weight: "400" },
                H6: { size: "14px", weight: "400" },
                Paragraph: { size: "14px", weight: "400" },
                Link: { size: "14px", weight: "400" },
            },
        }),
}));
