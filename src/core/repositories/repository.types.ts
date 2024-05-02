import type { allOptionsConfigInstance } from "@/core/mains/options/index.js";

export type AllStorageConfigInstanceMap = typeof allOptionsConfigInstance;
export type AllStorageConfigInstance = ValueOf<AllStorageConfigInstanceMap>;
// TODO: 型テスト書く
export type AllStorageKeys = AllStorageConfigInstance["storageKey"];
