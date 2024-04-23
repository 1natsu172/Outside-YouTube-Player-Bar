import { waitElement } from "@1natsu/wait-element";

export const injectStyle = async (css: string) => {
	const styleElement = document.createElement("style");
	styleElement.textContent = css;

	const head = await waitElement("head");
	requestIdleCallback(() => head.appendChild(styleElement));
};
