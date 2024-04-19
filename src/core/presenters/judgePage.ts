export const isVideoPage = (pathName: string) => {
	const userLivePagePathnamePattern = /^\/@?[^/]+\/live$/;

	return !!(
		pathName === "/watch" || userLivePagePathnamePattern.test(pathName)
	);
};
