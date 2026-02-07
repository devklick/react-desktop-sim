import { del, get, set } from "idb-keyval";
import { StateStorage } from "zustand/middleware";

export const idbStorageAdaptor: StateStorage = {
  getItem: async (name) => {
    return (await get<string>(name)) ?? null;
  },
  setItem: async (name, value) => {
    await set(name, value);
  },
  removeItem: async (name) => {
    await del(name);
  },
};

export default idbStorageAdaptor;
