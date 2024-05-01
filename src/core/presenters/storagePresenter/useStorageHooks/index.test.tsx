// @vitest-environment happy-dom

import { centralStorage } from "@/core/infrastructures/storage/centralStorage.js";
import { act, render, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { useStorage } from "./index.js";

describe(`${useStorage.name}`, () => {
	const TESTING_KEY = "local:testing:useStorage";
	beforeEach(async () => {
		await centralStorage.setItem(TESTING_KEY, { name: "Alice" });

		// cleanup
		return async () => {
			await centralStorage.removeItem(TESTING_KEY);
		};
	});

	test("test", async () => {
		// @ts-expect-error
		const { result, rerender } = renderHook(() => useStorage(TESTING_KEY));

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
