import {
	reactCaptureClient,
	reactCaptureSdk,
} from "@/core/presenters/observabilities/captureClient.presenter.js";
import { waitElement } from "@1natsu/wait-element";
import { createRoot } from "react-dom/client";
import { App } from "./App/App.js";

//"THIS LOGGING FOR SIDE_EFFECT LOADING"
reactCaptureClient;

(async () => {
	const mountTarget = await waitElement("#root");

	const root = createRoot(mountTarget, {
		onRecoverableError: reactCaptureSdk.reactErrorHandler(),
	});
	root.render(<App />);
})();
