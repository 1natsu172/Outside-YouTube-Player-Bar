import { deepClone } from "valtio/utils";
import { snapshot } from "valtio/vanilla";

export function resetProxyState(
	/**
	 * targetObj must be valtio proxy object
	 */
	resetTargetProxy: Record<string, unknown>,
) {
	const _snap = snapshot(resetTargetProxy);

	const onReset = (targetProxy: Record<string, unknown>) => {
		const _initialState = deepClone(_snap);
		for (const key of Object.keys(_initialState)) {
			targetProxy[key] = _initialState[key];
		}
	};

	return () => {
		onReset(resetTargetProxy);
	};
}
