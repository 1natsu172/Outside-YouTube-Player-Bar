import { waitElement } from "@1natsu/wait-element";
import { createRoot } from "react-dom/client";
import { App } from "./App/App.js";

(async () => {
	const mountTarget = await waitElement("#root");

	const root = createRoot(mountTarget);
	root.render(<App />);
})();
