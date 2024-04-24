import { extensionNameCustomElementName } from "@/core/mains/meta.js";
import ReactDOM from "react-dom/client";
import type { ContentScriptContext } from "wxt/client";
import { App } from "../UI/App.js";
import { waitMountUITarget } from "./libs/mediateElement.js";

export const mountUI = async (ctx: ContentScriptContext) => {
	const targetElement = await waitMountUITarget();
	logger.info("Mount target is ready =>", targetElement);

	const ui = await createShadowRootUi(ctx, {
		name: extensionNameCustomElementName,
		anchor: targetElement,
		append: "first",
		position: "inline",
		onMount: (container) => {
			const root = ReactDOM.createRoot(container);
			root.render(<App />);
			return root;
		},
		onRemove: (root) => {
			// Unmount the root when the UI is removed
			root?.unmount();
			logger.info("UI unmounted.");
		},
	});
	ui.mount();
	logger.success("UI mounted.");
};
