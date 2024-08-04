import type { DefinedItem } from "@/core/infrastructures/storage/index.js";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";

type Subscribe = Parameters<typeof useSyncExternalStore>[0];

export const useStorage = <
	DefinedStorageItem extends DefinedItem<VT | null>,
	VT = DefinedStorageItem["defaultValue"],
>(
	definedSotorageItem: DefinedStorageItem,
) => {
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
			const unSubscribe = definedSotorageItem.watch((newValue, oldValue) => {
				if (newValue !== oldValue) {
					cachedV.current = newValue;
				}
				onStoreChange();
			});
			globalThis.__OYPB__?.ctx?.onInvalidated(() => {
				unSubscribe();
			});
			return () => {
				initOnStoreChange.current = fatalLog;
				if (globalThis.__OYPB__?.ctx?.isValid) {
					unSubscribe();
				}
			};
		},
		[definedSotorageItem, fatalLog],
	);

	// Must by sync method.
	const getSnapshot = (): VT | null => {
		return cachedV.current;
	};

	const store = useSyncExternalStore<VT | null>(subscribe, getSnapshot);

	// resolve async value for getSnapshot. Replace fake initial value(`null`) with trueth initial value(got storage value)
	useEffect(() => {
		definedSotorageItem
			.getValue()
			.then((value) => {
				cachedV.current = value;
				initOnStoreChange.current();
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setError(error);
			});
	}, [definedSotorageItem]);

	return { store, isLoading, error };
};
