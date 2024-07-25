import { describe, expect, test } from "vitest";
import { isMatchingPhrasePattern } from "./matchPattern.js";

describe(isMatchingPhrasePattern.name, () => {
	test("should return false if value is not string", () => {
		// @ts-expect-error Intentional wrong type value for test
		expect(isMatchingPhrasePattern(null, "foo")).toBe(false);
	});

	describe("string patterns", () => {
		test("should match string that partial includes match", () => {
			expect(isMatchingPhrasePattern("foo bar sand", "foo")).toBe(true);
		});

		test("should match string that exact match", () => {
			expect(
				isMatchingPhrasePattern("foo bar sand", "foo bar sand", true),
			).toBe(true);
		});

		test("should not match partial pattern if in case of exact match", () => {
			expect(isMatchingPhrasePattern("foo bar sand", "foo", true)).toBe(false);
		});
	});

	describe("RegExp patterns", () => {
		const F_to_D_regexp = /^f.*d$/;
		test("should match RegExp", () => {
			expect(isMatchingPhrasePattern("foo bar sand", F_to_D_regexp)).toBe(true);
		});

		test("should not match RegExp", () => {
			expect(isMatchingPhrasePattern("Zoo bar sand", F_to_D_regexp)).toBe(
				false,
			);
		});
	});
});
