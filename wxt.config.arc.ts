import { createWxtConfig, developConfig } from "./wxt.config.js";

developConfig.runner!.disabled = true;

// See https://wxt.dev/api/config.html
export default createWxtConfig({ developConfig });
