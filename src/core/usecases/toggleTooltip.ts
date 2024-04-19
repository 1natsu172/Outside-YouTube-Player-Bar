/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function toggleTooltipText(e: unknown, f: string, s: string) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const element: HTMLElement = e.target || e;
	const firstText = f;
	const secondText = s;
	const currentText = element.getAttribute("data-oypb-tooltip");

	let text = firstText;
	if (currentText === firstText) {
		text = secondText;
	}
	element.setAttribute("data-oypb-tooltip", text);
}
