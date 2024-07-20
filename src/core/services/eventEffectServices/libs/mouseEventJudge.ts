export function mouseleaveJudge({
	event,
	targetElement,
}: { targetElement: Element; event: MouseEvent }) {
	const elementRect = targetElement.getBoundingClientRect();
	// FIXME: 本来clientYなのだが、MoviePlayer→Barへbottom方向へmouseleaveしたときにclientYの値が期待値よりなぜが小さくなってしまう（おそらくシークバーのhoverでDOMが変わるから副作用が起こっている）。そのためビューポート起点のclientYではなく暫定的にスクリーン起点のscreenYを使っているが、あまりよくはない。
	// const mouseY = event.clientY
	const mouseY = event.screenY;

	const topEdge = elementRect.top;
	const bottomEdge = elementRect.bottom;

	const isLeaveFromTopEdge = mouseY < topEdge;
	const isLeaveFromBottomEdge = mouseY > bottomEdge;

	return { isLeaveFromTopEdge, isLeaveFromBottomEdge };
}

export const isMouseEvent = (event: Event): event is MouseEvent => {
	return event instanceof MouseEvent;
};

export const isElementTheTarget = (
	target: EventTarget | null,
): target is Element => {
	return target instanceof Element;
};
