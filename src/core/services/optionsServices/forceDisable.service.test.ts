import { forceDisable } from "@/core/repositories/options.repository.js";
import { setForceDisableOption } from "@/core/usecases/options.usecase.js";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fakeBrowser } from "wxt/testing";
import {
	checkAboutForceDisable,
	initializeForceDisable,
} from "./forceDisable.service.js";

// NOTE: vi.mock関数へ外で作ったフェイク関数を渡す場合、上位のトップレベルにhoistしておく必要がある https://vitest.dev/api/vi.html#vi-hoisted
const { mockGetManifest } = vi.hoisted(() => {
	return { mockGetManifest: vi.fn() };
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
});

describe(checkAboutForceDisable.name, () => {
	test("should return all false if not forceDisable", async () => {
		await setForceDisableOption(false, { extensionVersion: "4.0.0" });
		const ret = await checkAboutForceDisable();
		expect(ret).toStrictEqual({
			isDisabling: false,
			canDeactivateForceDisable: false,
		});
	});

	test("should return canDeactivateForceDisable:false if not found update", async () => {
		await setForceDisableOption(true, { extensionVersion: "4.0.0" });
		mockGetManifest.mockReturnValue({ version: "4.0.0" });

		const ret = await checkAboutForceDisable();
		expect(ret).toStrictEqual({
			isDisabling: true,
			canDeactivateForceDisable: false,
		});
	});

	test("should return canDeactivateForceDisable:true if found update", async () => {
		await setForceDisableOption(true, { extensionVersion: "4.0.0" });
		mockGetManifest.mockReturnValue({ version: "4.0.1" });

		const ret = await checkAboutForceDisable();
		expect(ret).toStrictEqual({
			isDisabling: true,
			canDeactivateForceDisable: true,
		});
	});
});

describe(initializeForceDisable.name, () => {
	test("should canProcessContinue is false if the forceDisable activated", async () => {
		await setForceDisableOption(true, { extensionVersion: "4.0.0" });
		mockGetManifest.mockReturnValue({ version: "4.0.0" });

		const ret = await initializeForceDisable();
		expect(ret).toStrictEqual({ canProcessContinue: false });
	});
	test("should canProcessContinue is true if the forceDisable deactivated", async () => {
		await setForceDisableOption(false, { extensionVersion: "4.0.0" });
		mockGetManifest.mockReturnValue({ version: "4.0.0" });

		const ret = await initializeForceDisable();
		expect(ret).toStrictEqual({ canProcessContinue: true });
	});
});
