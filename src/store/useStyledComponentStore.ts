import { create } from "zustand";
import { useTypographyStore } from "@/store/useTypographyStore";

interface StyledComponentStore {
    components: { [key: string]: any };
    setComponent: (fileName: string, data: any) => void;
}

export const useStyledComponentStore = create<StyledComponentStore>((set) => ({
    components: {},
    setComponent: (fileName: string, data: any) => {
        //@ts-ignore
        const setTypography = useTypographyStore.getState().setTypography;

        set((state) => ({
            components: { ...state.components, [fileName]: data },
        }));

        if (fileName === "typography") {
            setTypography(data.fontFamily);
        }
    },
}));
