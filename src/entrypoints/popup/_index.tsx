import { createRoot } from "react-dom/client";
import { Popup } from "./popup";

const container = document.getElementById("root");
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const root = createRoot(container!);

root.render(<Popup />);
