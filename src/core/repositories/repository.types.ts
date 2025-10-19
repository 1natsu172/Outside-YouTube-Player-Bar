import type { allOptionsConfigInstance } from "@/core/mains/options/index.js";

type AllStorageConfigInstanceMap = typeof allOptionsConfigInstance;
type AllStorageConfigInstance = ValueOf<AllStorageConfigInstanceMap>;
export type AllStorageKeys = AllStorageConfigInstance["storageKey"];
