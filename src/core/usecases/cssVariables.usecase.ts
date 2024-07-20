export const setPlayerBarHeightVar = (height: string) => {
	document.documentElement.style.setProperty(
		"--oypb-player-bar-height",
		height,
	);
};
