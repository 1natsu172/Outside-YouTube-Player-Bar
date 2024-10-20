import { extensionNameCustomElementName } from "@/core/mains/meta.js";
import { reactErrorHandler } from "@/utils/captureUtils/captureErrors/react/reactErrors.js";
import { createRoot } from "react-dom/client";
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
			// Container is a body, and React warns when creating a root on the body, so create a wrapper div
			const app = document.createElement("div");
			container.append(app);
			// Create a root on the UI container and render a component
			const root = createRoot(app, {
				onRecoverableError: reactErrorHandler(),
				// TODO: React19になったらハンドラを足す
			});

			root.render(<App />);
			return { root, app };
		},
		onRemove: (elements) => {
			// Unmount the root when the UI is removed
			elements?.root?.unmount();
			elements?.app.remove();
			logger.info("UI unmounted.");
		},
	});
	ui.mount();
	logger.success("UI mounted.");
};
