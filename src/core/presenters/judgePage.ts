export const isVideoPage = (pathName: string): boolean => {
	const userLivePagePathnamePattern = /^\/@?[^/]+\/live$/;

	return !!(
		pathName === "/watch" || userLivePagePathnamePattern.test(pathName)
	);
};
