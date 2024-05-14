/**
 * ref: https://stackoverflow.com/questions/53102700/how-do-i-turn-an-es6-proxy-back-into-a-plain-object-pojo
 * FIXME(feature): cloneDeep may be needed to handle irregular cases
 */
const proxyToPOJO = (
	proxyLike: Record<string, unknown>,
): Record<string, unknown> => {
	return JSON.parse(JSON.stringify(proxyLike));
};

export function resetProxyState(
	/**
	 * targetObj must be valtio proxy object
	 */
	targetObj: Record<string, unknown>,
) {
	const defaultResetTo = proxyToPOJO(targetObj);

	const onReset = (
		targetObj: Record<string, unknown>,
		initialObj: Record<string, unknown>,
	) => {
		for (const key of Object.keys(initialObj)) {
			const initialValue = initialObj[key];
			targetObj[key] = initialValue;
			if (typeof initialValue === "object" && initialValue !== null) {
				onReset(
					targetObj[key] as Record<string, unknown>,
					initialValue as Record<string, unknown>,
				);
			}
		}
	};

	return (
		/**
		 * resetToTheObject must be plain object. (ex. Proxy(OBJECT_THAT_HERE))
		 * If not passing this argument that uses the one at the moment when targetObj is passed.
		 */
		resetToTheObject?: Record<string, unknown>,
	) => {
		const resetTo = resetToTheObject || defaultResetTo;
		onReset(targetObj, resetTo);
	};
}
