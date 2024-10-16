import { centralStorage } from "@/core/infrastructures/storage/centralStorage.js";
import type { AllStorageKeys } from "@/core/repositories/repository.types.js";

import { use, useCallback, useRef, useSyncExternalStore } from "react";

type Subscribe = Parameters<typeof useSyncExternalStore>[0];

export const useStorage = <VT = unknown>(key: AllStorageKeys) => {
	const initialV = use(centralStorage.getItem<VT>(key));
	const cachedV = useRef<VT | null>(initialV);

	const subscribe: Subscribe = useCallback(
		(onStoreChange) => {
			const unSubscribe = centralStorage.watch<VT>(
				key,
				(newValue, oldValue) => {
					if (newValue !== oldValue) {
						cachedV.current = newValue;
					}
					onStoreChange();
				},
			);
			return unSubscribe;
		},
		[key],
	);

	// Must by sync method.
	const getSnapshot = (): VT | null => {
		return cachedV.current;
	};

	const store = useSyncExternalStore<VT | null>(subscribe, getSnapshot);
	return store;
};
