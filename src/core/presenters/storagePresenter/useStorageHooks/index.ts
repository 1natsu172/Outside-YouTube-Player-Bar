import { centralStorage } from "@/core/infrastructures/storage/centralStorage.js";
import type { AllStorageConfigInstance } from "@/core/repositories/repository.types.js";
import {
	useCallback,
	useRef,
	useSyncExternalStore,
	useEffect,
	useState,
} from "react";

type Subscribe = Parameters<typeof useSyncExternalStore>[0];

export const useStorage = <
	ConfigInstance extends AllStorageConfigInstance,
	VT = ConfigInstance["defaultValue"],
>(
	storageConfigInstance: ConfigInstance,
) => {
	const key = storageConfigInstance.storageKey;
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const cachedV = useRef<VT | null>(null);
	const fatalLog = useCallback(() => {
		logger.fatal("Should not display this message!!! Something wrong!!!");
	}, []);
	const initOnStoreChange = useRef<() => void>(fatalLog);

	const subscribe: Subscribe = useCallback(
		(onStoreChange) => {
			initOnStoreChange.current = onStoreChange;
			const unSubscribe = centralStorage.watch<VT>(
				key,
				(newValue, oldValue) => {
					if (newValue !== oldValue) {
						cachedV.current = newValue;
					}
					onStoreChange();
				},
			);
			return () => {
				initOnStoreChange.current = fatalLog;
				unSubscribe();
			};
		},
		[key, fatalLog],
	);

	// Must by sync method.
	const getSnapshot = (): VT | null => {
		return cachedV.current;
	};

	const store = useSyncExternalStore<VT | null>(subscribe, getSnapshot);

	// resolve async value for getSnapshot. Replace fake initial value(`null`) with trueth initial value(got storage value)
	useEffect(() => {
		centralStorage
			.getItem<VT>(key)
			.then((value) => {
				cachedV.current = value;
				initOnStoreChange.current();
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setError(error);
			});
	}, [key]);

	return { store, isLoading, error };
};
