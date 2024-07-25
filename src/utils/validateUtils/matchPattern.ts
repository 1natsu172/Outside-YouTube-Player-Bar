export function isRegExp(value: unknown) {
	return value instanceof RegExp;
}
export function isString(value: unknown) {
	return typeof value === "string";
}

/**
 * Reference from Sentry utils: https://github.com/getsentry/sentry-javascript/blob/36f62bb023a02332bcfd5c54785f89106b952724/packages/utils/src/string.ts#L105
 */
export function isMatchingPhrasePattern(
	value: string,
	pattern: RegExp | string,
	requireExactStringMatch = false,
): boolean {
	if (!isString(value)) {
		return false;
	}

	if (isRegExp(pattern)) {
		return pattern.test(value);
	}

	if (isString(pattern)) {
		return requireExactStringMatch
			? value === pattern
			: value.includes(pattern);
	}

	return false;
}
