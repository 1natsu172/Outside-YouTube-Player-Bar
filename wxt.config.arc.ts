import { createWxtConfig, developConfig } from "./wxt.config.js";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
developConfig.webExt!.disabled = true;

// See https://wxt.dev/api/config.html
export default createWxtConfig({ developConfig });
