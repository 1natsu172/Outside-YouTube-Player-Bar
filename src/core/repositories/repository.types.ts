import type { allOptionsConfigInstance } from "@/core/mains/options/index.js";

export type AllStorageConfigInstanceMap = typeof allOptionsConfigInstance;
export type AllStorageConfigInstance = ValueOf<AllStorageConfigInstanceMap>;
export type AllStorageKeys = AllStorageConfigInstance["storageKey"];
