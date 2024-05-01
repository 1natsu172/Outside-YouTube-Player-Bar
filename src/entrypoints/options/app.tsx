import { createRoot } from "react-dom/client";
import { App } from "./App/index.js";
import { waitElement } from "@1natsu/wait-element";

const mountTarget = await waitElement("#root");

const root = createRoot(mountTarget);
root.render(<App />);
