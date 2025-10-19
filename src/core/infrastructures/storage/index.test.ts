import { expect, test } from "vitest";
import { allOptionsConfigInstance } from "@/core/mains/options/index.js";
import { createStorageConfig } from "./index.js";

test(createStorageConfig.name, () => {
	const configInstance = createStorageConfig(
		allOptionsConfigInstance.DebugModeOptionConfig,
	);
	expect(configInstance.storageKey).toMatchInlineSnapshot(
		`"local:option:EXT_META:debugMode"`,
	);
});
