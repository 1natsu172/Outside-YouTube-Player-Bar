import { assertType, expectTypeOf, test } from "vitest";
import { createStorageConfig } from "./index.js";
import type { StorageItemConfigInstance } from "./storage.types.js";

const CONST_KEY = "TESTING:TYPES" as const;

test(createStorageConfig.name, () => {
	const baseConfig = {
		storageArea: "local",
		itemKey: `${CONST_KEY}:createStorageConfig`,
		version: 1,
		defaultValue: {
			testFor: true,
		},
		defaultMeta: {},
	} as const;

	const actual = createStorageConfig(baseConfig);

	expectTypeOf(actual).toMatchTypeOf<
		StorageItemConfigInstance<typeof baseConfig>
	>();
	assertType<`${(typeof baseConfig)["storageArea"]}:${(typeof baseConfig)["itemKey"]}`>(
		actual.storageKey,
	);
});
