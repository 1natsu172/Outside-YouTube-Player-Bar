// @vitest-environment happy-dom

import { centralStorage } from "@/core/infrastructures/storage/centralStorage.js";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { useStorage } from "./index.js";
import { createStorageConfig } from "@/core/infrastructures/storage/index.js";

describe(`${useStorage.name}`, () => {
	const TESTING_STORAGE_CONFIG = createStorageConfig({
		storageArea: "local",
		itemKey: "testing:useStorage",
		version: 1,
		defaultValue: { name: "" },
		defaultMeta: {},
	});
	const TESTING_KEY = TESTING_STORAGE_CONFIG.storageKey;
	const TESTING_DEFINED_ITEM = centralStorage.defineItem(TESTING_KEY, {
		defaultValue: { name: "Alice" },
	});

	beforeEach(async () => {
		// cleanup
		return async () => {
			await TESTING_DEFINED_ITEM.removeValue();
		};
	});

	test("test", async () => {
		const { result, rerender } = renderHook(() =>
			useStorage(TESTING_DEFINED_ITEM),
		);

		expect(result.current).toEqual({
			isLoading: true,
			error: undefined,
			store: null,
		});

		await waitFor(rerender);

		expect(result.current).toEqual({
			isLoading: false,
			error: undefined,
			store: { name: "Alice" },
		});

		await waitFor(() =>
			centralStorage.setItem(TESTING_KEY, {
				name: "bob",
			}),
		);

		expect(result.current).toEqual({
			isLoading: false,
			error: undefined,
			store: { name: "bob" },
		});
	});
});
