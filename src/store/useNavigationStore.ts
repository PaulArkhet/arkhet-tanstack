import { create } from "zustand";

type NavigationType = "internalNavigation" | "segmentedButton" | "";

interface NavigationStore {
    navigationType: NavigationType;
    setNavigationType: (type: NavigationType | "") => void;
    styles: {
        internal: React.CSSProperties;
        active: React.CSSProperties;
    };
    setStyles: (
        internalStyles: Partial<React.CSSProperties>,
        activeStyles: Partial<React.CSSProperties>
    ) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
    navigationType: "",
    setNavigationType: (type: NavigationType | "") =>
        set({ navigationType: type }),
    styles: {
        internal: {
            borderBottom: "1px solid #303637",
            borderRadius: "0px",
            paddingBottom: "4px",
        },
        active: {
            color: "#ECC06C", 
            textDecoration: "", 
            textDecorationThickness: "", 
            marginBottom: "-4px",
            textDecorationOffset: "9px", 
            borderBottom: "4px solid #ECC06C", 
        },
    },
    setStyles: (internalStyles, activeStyles) =>
        set((state) => ({
            styles: {
                internal: {
                    ...state.styles.internal,
                    ...internalStyles,
                },
                active: {
                    ...state.styles.active,
                    ...activeStyles,
                },
            },
        })),
}));
