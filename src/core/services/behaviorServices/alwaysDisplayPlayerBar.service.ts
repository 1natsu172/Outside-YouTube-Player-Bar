export const createBlockAutohideFn = (moviePlayer: Element) => {
	const mousedownEvent = new Event("mousedown");
	// const mousemoveEvent = new Event("mousemove");
	// const mouseoverEvent = new Event("mouseover");
	const mouseleaveEvent = new Event("mouseleave");

	const mousedown = () => moviePlayer.dispatchEvent(mousedownEvent);
	// const mousemove = () => moviePlayer.dispatchEvent(mousemoveEvent);
	// const mouseover = () => moviePlayer.dispatchEvent(mouseoverEvent);
	const mouseleave = () => moviePlayer.dispatchEvent(mouseleaveEvent);

	/**
	 * NOTE: ytp-autohideの解除がなぜかこのEvent操作でできる
	 */
	const blockAutohide = () => {
		mousedown();
		mouseleave();
		logger.log("blockAutoHide function fired.");
	};

	return blockAutohide;
};
