import { create } from "zustand";

type projectStore = {
    project: any;
    setProject: (args: any) => void;
};

const useProjectStore = create<projectStore>((set, _) => ({
    project: null,
    setProject: (args: any) => set({ project: args }),
}));

export default useProjectStore;
