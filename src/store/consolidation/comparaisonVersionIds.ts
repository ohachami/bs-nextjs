import { create } from 'zustand';

interface ComparaisonVersionIdsStore {
  versionIds: string[];
  addVersionId: (id: string) => void;
  insertOrReplaceVersionId: (index: number, id: string) => void;
  removeVersionId: (id: string) => void;
  clearVersionIds: () => void;
}

export const useComparaisonVersionIds = create<ComparaisonVersionIdsStore>((set) => ({
  // versionIds list
  versionIds: [],
  // adding an element
  addVersionId: (id) =>
    set((state) =>
      state.versionIds.includes(id)
        ? state
        : { versionIds: [...state.versionIds, id] }
    ),
  // insert or replace
  insertOrReplaceVersionId: (index, id) =>
    set((state) => {
      const newVersionIds = [...state.versionIds];
      if (index < newVersionIds.length) {
        newVersionIds[index] = id; // Replace existing
      } else {
        newVersionIds.splice(index, 0, id); // Insert at out-of-bounds index
      }
      return { versionIds: newVersionIds };
    }),
  // removing an element
  removeVersionId: (id) =>
    set((state) => ({
      versionIds: state.versionIds.filter((v) => v !== id),
    })),
  // clearing the versionIds list
  clearVersionIds: () => set({ versionIds: [] }),
}));
