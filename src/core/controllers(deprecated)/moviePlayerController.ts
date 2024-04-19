export async function moviePlayerController(moviePlayer: Element) {
	const mousedownEvent = new Event("mousedown");
	const mousemoveEvent = new Event("mousemove");
	// const mouseoverEvent = new Event("mouseover");
	const mouseleaveEvent = new Event("mouseleave");

	return {
		mousedown() {
			moviePlayer.dispatchEvent(mousedownEvent);
		},
		mousemove() {
			moviePlayer.dispatchEvent(mousemoveEvent);
		},
		mouseleave() {
			moviePlayer.dispatchEvent(mouseleaveEvent);
		},
	};
}
