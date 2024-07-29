import { reactCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";
import { setupGlobalCaptureError } from "@/utils/captureUtils/captureErrors/globalCapture.js";
import { reactErrorHandler } from "@/utils/captureUtils/captureErrors/react/reactErrors.js";
import { waitElement } from "@1natsu/wait-element";
import { createRoot } from "react-dom/client";
import { App } from "./App/App.js";

(async () => {
	setupGlobalCaptureError(reactCaptureClient);
	const mountTarget = await waitElement("#root");

	const root = createRoot(mountTarget, {
		onRecoverableError: reactErrorHandler(),
		// TODO: React19になったらハンドラを足す
	});
	root.render(<App />);
})();
