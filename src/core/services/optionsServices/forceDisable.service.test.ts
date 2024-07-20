import { getForceDisableOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import { forceDisable } from "@/core/repositories/options.repository.js";
import { setForceDisableOption } from "@/core/usecases/options.usecase.js";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fakeBrowser } from "wxt/testing";
import {
	checkAboutForceDisable,
	initializeForceDisable,
	switchContinueForceDisableForNow,
	switchForceDisable,
} from "./forceDisable.service.js";

// NOTE: vi.mock関数へ外で作ったフェイク関数を渡す場合、上位のトップレベルにhoistしておく必要がある https://vitest.dev/api/vi.html#vi-hoisted
const { mockRuntimeOnMessage, mockGetManifest, mockReload } = vi.hoisted(() => {
	return {
		mockGetManifest: vi.fn(),
		mockReload: vi.fn(),
		mockRuntimeOnMessage: vi.fn(),
	};
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
			runtime: {
				...original.fakeBrowser.runtime,
				getManifest: mockGetManifest,
			},
		},
	};
});

beforeEach(async () => {
	fakeBrowser.reset();
	await forceDisable.removeValue({ removeMeta: true });
	// NOTE: In the unit test, background.js does not exist, so the onMessage listener is set to 0 and fakeBrowser's mock does not work correctly. To work around this problem.
	fakeBrowser.runtime.onMessage.addListener(
		mockRuntimeOnMessage.mockImplementation((res) => ({ res })),
	);
});

describe(checkAboutForceDisable.name, () => {
	test("should return all false if not forceDisable", async () => {
		await setForceDisableOption(false);
		const ret = await checkAboutForceDisable();
		expect(ret).toStrictEqual({
			isDisabling: false,
			hasBeenUpdateAfterForceDisable: false,
			choosingToContinue: false,
			hasBeenUpdateAfterContinueChoosed: false,
			isShowUpdateRed: false,
		});
	});

	describe("About hasBeenUpdateAfterForceDisable", () => {
		test("should return hasBeenUpdateAfterForceDisable:false if not found update", async () => {
			await setForceDisableOption(true, { disabledExtensionVersion: "4.0.0" });
			mockGetManifest.mockReturnValue({ version: "4.0.0" });

			const ret = await checkAboutForceDisable();
			expect(ret).toStrictEqual(
				expect.objectContaining({
					isDisabling: true,
					hasBeenUpdateAfterForceDisable: false,
				}),
			);
		});

		test("should return hasBeenUpdateAfterForceDisable:true if found update", async () => {
			await setForceDisableOption(true, { disabledExtensionVersion: "4.0.0" });
			mockGetManifest.mockReturnValue({ version: "4.0.1" });

			const ret = await checkAboutForceDisable();
			expect(ret).toStrictEqual(
				expect.objectContaining({
					isDisabling: true,
					hasBeenUpdateAfterForceDisable: true,
				}),
			);
		});
	});

	describe("About continueForceDisableForNow", () => {
		test("should return choosingToContinue: true if continuing", async () => {
			await setForceDisableOption(true, {
				disabledExtensionVersion: "4.0.0",
				continueForceDisableForNow: {
					isContinue: true,
					continueChoosedExtensionVersion: "4.0.0",
				},
			});
			mockGetManifest.mockReturnValue({ version: "4.0.0" });

			const ret = await checkAboutForceDisable();
			expect(ret).toStrictEqual(
				expect.objectContaining({
					isDisabling: true,
					choosingToContinue: true,
				}),
			);
		});

		test("should return choosingToContinue: false if not continuing", async () => {
			await setForceDisableOption(true, {
				disabledExtensionVersion: "4.0.0",
				continueForceDisableForNow: {
					isContinue: false,
				},
			});
			mockGetManifest.mockReturnValue({ version: "4.0.1" });

			const ret = await checkAboutForceDisable();
			expect(ret).toStrictEqual(
				expect.objectContaining({
					isDisabling: true,
					choosingToContinue: false,
				}),
			);
		});

		test("should hasBeenUpdateAfterContinueChoosed", async () => {
			await setForceDisableOption(true, {
				disabledExtensionVersion: "4.0.0",
				continueForceDisableForNow: {
					isContinue: true,
					continueChoosedExtensionVersion: "4.0.1",
				},
			});
			mockGetManifest.mockReturnValue({ version: "4.0.2" });

			const ret = await checkAboutForceDisable();
			expect(ret).toStrictEqual(
				expect.objectContaining({
					isDisabling: true,
					choosingToContinue: true,
					hasBeenUpdateAfterContinueChoosed: true,
				}),
			);
		});
	});

	describe("About isShowUpdateRed", () => {
		test("should return true | disabledExtensionVersion < currentVersion", async () => {
			await setForceDisableOption(true, {
				disabledExtensionVersion: "4.0.0",
			});
			mockGetManifest.mockReturnValue({ version: "4.0.1" });

			const ret = await checkAboutForceDisable();
			expect(ret).toStrictEqual(
				expect.objectContaining({
					isDisabling: true,
					isShowUpdateRed: true,
				}),
			);
		});

		test("should return false | disabledExtensionVersion = currentVersion", async () => {
			await setForceDisableOption(true, {
				disabledExtensionVersion: "4.0.1",
			});
			mockGetManifest.mockReturnValue({ version: "4.0.1" });

			const ret = await checkAboutForceDisable();
			expect(ret).toStrictEqual(
				expect.objectContaining({
					isDisabling: true,
					isShowUpdateRed: false,
				}),
			);
		});

		test("should return true | disabledExtensionVersion < continueChoosedExtensionVersion < currentVersion", async () => {
			await setForceDisableOption(true, {
				disabledExtensionVersion: "4.0.0",
				continueForceDisableForNow: {
					isContinue: true,
					continueChoosedExtensionVersion: "4.0.1",
				},
			});
			mockGetManifest.mockReturnValue({ version: "4.0.2" });

			const ret = await checkAboutForceDisable();
			expect(ret).toStrictEqual(
				expect.objectContaining({
					isDisabling: true,
					isShowUpdateRed: true,
				}),
			);
		});

		test("should return false | disabledExtensionVersion < continueChoosedExtensionVersion = currentVersion", async () => {
			await setForceDisableOption(true, {
				disabledExtensionVersion: "4.0.0",
				continueForceDisableForNow: {
					isContinue: true,
					continueChoosedExtensionVersion: "4.0.1",
				},
			});
			mockGetManifest.mockReturnValue({ version: "4.0.1" });

			const ret = await checkAboutForceDisable();
			expect(ret).toStrictEqual(
				expect.objectContaining({
					isDisabling: true,
					isShowUpdateRed: false,
				}),
			);
		});
	});
});

describe(initializeForceDisable.name, () => {
	test("should canProcessContinue is false if the forceDisable activated", async () => {
		await setForceDisableOption(true, { disabledExtensionVersion: "4.0.0" });
		mockGetManifest.mockReturnValue({ version: "4.0.0" });

		const ret = await initializeForceDisable();
		expect(ret).toStrictEqual({ canProcessContinue: false });
	});
	test("should canProcessContinue is true if the forceDisable deactivated", async () => {
		await setForceDisableOption(false, { disabledExtensionVersion: "4.0.0" });
		mockGetManifest.mockReturnValue({ version: "4.0.0" });

		const ret = await initializeForceDisable();
		expect(ret).toStrictEqual({ canProcessContinue: true });
	});
});

describe(switchForceDisable.name, () => {
	test("should activate to force disable and set disabledExtensionVersion", async () => {
		mockGetManifest.mockReturnValue({ version: "4.0.0" });

		await switchForceDisable(true);

		const currentOption = await getForceDisableOption();
		expect(currentOption).toStrictEqual({
			value: true,
			meta: {
				disabledExtensionVersion: "4.0.0",
			},
		});
	});

	test("should deactivate to force disable and remove disabledExtensionVersion", async () => {
		mockGetManifest.mockReturnValue({ version: "4.0.0" });
		await setForceDisableOption(true, { disabledExtensionVersion: "4.0.0" });

		expect(await getForceDisableOption()).toStrictEqual({
			value: true,
			meta: { disabledExtensionVersion: "4.0.0" },
		});

		await switchForceDisable(false);

		const currentOption = await getForceDisableOption();
		expect(currentOption).toStrictEqual({
			value: false,
			meta: {},
		});
	});

	test("should call with `sendMessage` with `reloadYouTubeTabs` type", async () => {
		// NOTE: Mock that the reload request is sent with sendMessage
		fakeBrowser.runtime.onMessage.addListener((data) => {
			if (data.type === "reloadYouTubeTabs") {
				mockReload();
			}
		});

		mockGetManifest.mockReturnValue({ version: "4.0.0" });
		await switchForceDisable(true);
		expect(mockReload).toHaveBeenCalledTimes(1);
		await switchForceDisable(false);
		expect(mockReload).toHaveBeenCalledTimes(2);
	});
});

describe(switchContinueForceDisableForNow.name, () => {
	test("should set continueForceDisableForNow state w/ extensionVersion if choosed continue", async () => {
		mockGetManifest.mockReturnValue({ version: "4.0.0" });

		await switchContinueForceDisableForNow({ isContinue: true });

		const currentOption = await getForceDisableOption();
		expect(currentOption).toStrictEqual({
			value: false,
			meta: {
				continueForceDisableForNow: {
					isContinue: true,
					continueChoosedExtensionVersion: "4.0.0",
				},
			},
		});
	});

	test("should unset continueForceDisableForNow state if discontinue", async () => {
		mockGetManifest.mockReturnValue({ version: "4.0.0" });
		await setForceDisableOption(true, {
			disabledExtensionVersion: "4.0.0",
			continueForceDisableForNow: {
				isContinue: true,
				continueChoosedExtensionVersion: "4.0.0",
			},
		});

		expect(await getForceDisableOption()).toStrictEqual({
			value: true,
			meta: {
				disabledExtensionVersion: "4.0.0",
				continueForceDisableForNow: {
					isContinue: true,
					continueChoosedExtensionVersion: "4.0.0",
				},
			},
		});

		await switchContinueForceDisableForNow({ isContinue: false });

		const currentOption = await getForceDisableOption();
		expect(currentOption).toStrictEqual({
			value: true,
			meta: {
				disabledExtensionVersion: "4.0.0",
				continueForceDisableForNow: {
					isContinue: false,
				},
			},
		});
	});
});
