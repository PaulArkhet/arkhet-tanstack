import { create } from "zustand";

interface PrototypeState {
    isPrototypeReady: boolean;
    setIsPrototypeReady: (isReady: boolean) => void;
    prototypeCurrentHistory: number;
    setPrototypeCurrentHistory: (history: number) => void;
}

const usePrototypeStore = create<PrototypeState>((set) => ({
    isPrototypeReady: false,
    setIsPrototypeReady: (isReady: boolean) =>
        set({ isPrototypeReady: isReady }),
    prototypeCurrentHistory: 0,
    setPrototypeCurrentHistory: (history: number) =>
        set({ prototypeCurrentHistory: history }),
}));

export default usePrototypeStore;
