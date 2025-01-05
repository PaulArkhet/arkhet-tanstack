import { create } from "zustand";

type DemoPrototypeStore = {
    currentPrototype: number;
    setCurrentPrototype: (version: number) => void;
};

const useDemoPrototypeStore = create<DemoPrototypeStore>((set, _) => ({
    currentPrototype: 1,
    setCurrentPrototype: (version: number) =>
        set({ currentPrototype: version }),
}));

export default useDemoPrototypeStore;
