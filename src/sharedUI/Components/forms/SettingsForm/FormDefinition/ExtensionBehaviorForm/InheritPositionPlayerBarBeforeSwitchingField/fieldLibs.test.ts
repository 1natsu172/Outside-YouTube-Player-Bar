import { describe, expect, test, vi } from "vitest";
import { createInheritablePositionPlayerBarSelect } from "./fieldLibs.js";

// NOTE: vi.mock関数へ外で作ったフェイク関数を渡す場合、上位のトップレベルにhoistしておく必要がある https://vitest.dev/api/vi.html#vi-hoisted
const { mockGetMessage } = vi.hoisted(() => {
	return { mockGetMessage: vi.fn() };
});

/**
 * @description NOTE: vitest.configの`WxtPlugin()`経由でbrowserオブジェクトは自動モックされているが、一部メソッドはimplementationがないので自前mockが必要
 * wxt-testing(WxtPlugin) => @webext-core/fake-browser => webextension-polyfill の依存で自動モックしているので、特定のメソッドだけmockしなおしている
 * Ref: https://github.com/wxt-dev/wxt-examples/tree/62205ab44c02779cad4fc9132a7184620586de2a/examples/vanilla-vitest#readme
 */
vi.mock("wxt/testing", async (importOriginal) => {
	const original = await importOriginal<typeof import("wxt/testing")>();
	return {
		...original,
		fakeBrowser: {
			...original.fakeBrowser,
			i18n: {
				...original.fakeBrowser.i18n,
				getMessage: mockGetMessage,
			},
		},
	};
});

describe(createInheritablePositionPlayerBarSelect, () => {
	test.each([
		{
			mode: "defaultView",
			expected: [
				{ label: expect.any(String), value: "theaterMode" },
				{ label: expect.any(String), value: "fullscreen" },
			],
		},
		{
			mode: "theaterMode",
			expected: [
				{ label: expect.any(String), value: "defaultView" },
				{ label: expect.any(String), value: "fullscreen" },
			],
		},
		{
			mode: "fullscreen",
			expected: [
				{ label: expect.any(String), value: "defaultView" },
				{ label: expect.any(String), value: "theaterMode" },
			],
		},
	] as const)(
		`${createInheritablePositionPlayerBarSelect.name} returns $expected when $mode`,
		({ mode, expected }) => {
			mockGetMessage.mockReturnValue("mocked message");
			expect(createInheritablePositionPlayerBarSelect(mode)).toStrictEqual(
				expected,
			);
		},
	);
});
