import { consola as logger } from "consola";
import { defineWxtModule } from "wxt/modules";

export default defineWxtModule({
	name: "distinguishOutput",
	configKey: "localWxtModule:distinguishOutput",
	setup: (wxt) => {
		const { mode } = wxt.config;

		wxt.hooks.hook("ready", () => {
			wxt.config.outDir = wxt.config.outDir.replace(
				wxt.config.outDir,
				`${wxt.config.outDir}/${mode}`,
			);
		});

		wxt.hooks.hook("build:manifestGenerated", (_, manifest) => {
			if (mode === "development") {
				manifest.name = `[DEV] ${manifest.name}`;
			}
		});

		wxt.hooks.hook("build:done", (wxt, buildOutput) => {
			logger.info("This time outDir =>", wxt.config.outDir);
			logger.info("This time manifest =>", buildOutput.manifest.name);
		});
	},
});
