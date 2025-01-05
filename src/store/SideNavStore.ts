/*
Author: Paul Kim, Vitor Akiyama, Selina Park
Date: September 16, 2024
Version: 0.0.1
Detail: SideNav for Arkhet
*/

import { create } from "zustand";

export const pages = [
    { name: "dashboard", path: "/dashboard" },
    { name: "dataset", path: "/dataset" },
    { name: "designSystem", path: "/designsystem" },
] as const;

export type Page = (typeof pages)[number];

type NavigationStore = {
    activePage: Page;
    setActivePage: (page: Page["name"]) => void;
};

const useSideNavStore = create<NavigationStore>((set, _) => ({
    activePage: { name: "dashboard", path: "/dashboard" },
    setActivePage: (name: Page["name"]) =>
        set({ activePage: pages.find((page) => page.name === name) }),
}));

export default useSideNavStore;
