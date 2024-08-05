import { waitElement } from "@1natsu/wait-element";

export const injectStyle = async (css: string) => {
	const styleElement = document.createElement("style");
	styleElement.textContent = css;

	const head = await waitElement("head");
	const ricId = requestIdleCallback(() => head.appendChild(styleElement));

	globalThis.__OYPB__?.ctx?.onInvalidated(() => cancelIdleCallback(ricId));
};
