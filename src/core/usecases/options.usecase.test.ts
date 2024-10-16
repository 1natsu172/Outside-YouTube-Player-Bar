import {
	createStorageConfig,
	defineItem,
} from "@/core/infrastructures/storage/index.js";
import * as repo from "@/core/repositories/options.repository.js";
import { beforeEach, describe, expect, test } from "vitest";
import {
	getDefaultViewBehaviorOption,
	getFullscreenBehaviorOption,
	getTheaterModeBehaviorOption,
} from "../presenters/storagePresenter/options.presenter.js";
import {
	_generalUpdate,
	setDefaultViewBehaviorOption,
	setFullscreenBehaviorOption,
	setTheaterModeBehaviorOption,
} from "./options.usecase.js";

const boolDefinedItem = defineItem<boolean>(
	createStorageConfig({
		version: 1,
		storageArea: "local",
		itemKey: "TESTING:usecase:boolean",
		defaultValue: true,
		defaultMeta: {},
	} as const),
);
const objectDefinedItem = defineItem<{ test: string; month: string }>(
	createStorageConfig({
		version: 1,
		storageArea: "local",
		itemKey: "TESTING:usecase:object",
		defaultValue: { test: "testing", month: "may" },
		defaultMeta: {},
	} as const),
);

beforeEach(async () => {
	// NOTE: reset definedItem to defaultValue
	await boolDefinedItem.removeValue({ removeMeta: true });
	await objectDefinedItem.removeValue({ removeMeta: true });
	for (const _repo of Object.values(repo)) {
		_repo.removeValue({ removeMeta: true });
	}
});

describe(_generalUpdate.name, () => {
	test("should update value and meta", async () => {
		const v = { test: "yes", month: "april" };
		const m = { updatedAt: new Date() };
		await _generalUpdate(objectDefinedItem, v, m);
		expect(await objectDefinedItem.getValue()).toStrictEqual(v);
		expect(await objectDefinedItem.getMeta()).toStrictEqual(m);
	});

	test("should update value w/o meta", async () => {
		const v = { test: "w/o meta", month: "april" };
		const m = undefined;
		await _generalUpdate(objectDefinedItem, v, m);
		expect(await objectDefinedItem.getValue()).toStrictEqual(v);
		expect(await objectDefinedItem.getMeta()).toStrictEqual({});
	});

	test("should update meta w/o value", async () => {
		const v = undefined;
		const m = { desc: "w/o TValue" };
		await _generalUpdate(objectDefinedItem, v, m);
		expect(await objectDefinedItem.getMeta()).toStrictEqual(m);
	});

	test("should 'not' update value when TValue is undefined OR null", async () => {
		expect(await objectDefinedItem.getValue()).toMatchInlineSnapshot(`
			{
			  "month": "may",
			  "test": "testing",
			}
		`);

		await _generalUpdate(objectDefinedItem, undefined);
		expect(await objectDefinedItem.getValue()).toMatchInlineSnapshot(`
			{
			  "month": "may",
			  "test": "testing",
			}
		`);

		await _generalUpdate(objectDefinedItem, null);
		expect(await objectDefinedItem.getValue()).toMatchInlineSnapshot(`
			{
			  "month": "may",
			  "test": "testing",
			}
		`);
	});

	test("should update by `false`", async () => {
		await _generalUpdate(boolDefinedItem, false);
		expect(await boolDefinedItem.getValue()).toBe(false);
	});
});

describe("BehaviorOptions", () => {
	describe(setDefaultViewBehaviorOption.name, () => {
		test("should update with merged current values", async () => {
			expect(await getDefaultViewBehaviorOption()).toStrictEqual({
				positionPlayerBar: "outside",
				alwaysDisplayPlayerBar: true,
				inheritPositionPlayerBarBeforeSwitching: ["theaterMode"],
			});
			await setDefaultViewBehaviorOption({
				alwaysDisplayPlayerBar: false,
				inheritPositionPlayerBarBeforeSwitching: ["fullscreen"],
			});
			expect(await getDefaultViewBehaviorOption()).toStrictEqual({
				positionPlayerBar: "outside",
				alwaysDisplayPlayerBar: false,
				inheritPositionPlayerBarBeforeSwitching: ["fullscreen"],
			});
		});
		test("should inheritPositionPlayerBarBeforeSwitching value always overwrite", async () => {
			expect(await getDefaultViewBehaviorOption()).toStrictEqual({
				positionPlayerBar: "outside",
				alwaysDisplayPlayerBar: true,
				inheritPositionPlayerBarBeforeSwitching: ["theaterMode"],
			});
			await setDefaultViewBehaviorOption({
				alwaysDisplayPlayerBar: false,
				inheritPositionPlayerBarBeforeSwitching: [
					"defaultView",
					"theaterMode",
					"fullscreen",
				],
			});
			expect(await getDefaultViewBehaviorOption()).toStrictEqual({
				positionPlayerBar: "outside",
				alwaysDisplayPlayerBar: false,
				inheritPositionPlayerBarBeforeSwitching: [
					"defaultView",
					"theaterMode",
					"fullscreen",
				],
			});
		});
	});

	describe(setTheaterModeBehaviorOption.name, () => {
		test("should update with merged current values", async () => {
			expect(await getTheaterModeBehaviorOption()).toStrictEqual({
				positionPlayerBar: "outside",
				alwaysDisplayPlayerBar: true,
				inheritPositionPlayerBarBeforeSwitching: ["defaultView"],
			});
			await setTheaterModeBehaviorOption({
				alwaysDisplayPlayerBar: false,
				inheritPositionPlayerBarBeforeSwitching: ["fullscreen"],
			});
			expect(await getTheaterModeBehaviorOption()).toStrictEqual({
				positionPlayerBar: "outside",
				alwaysDisplayPlayerBar: false,
				inheritPositionPlayerBarBeforeSwitching: ["fullscreen"],
			});
		});
		test("should inheritPositionPlayerBarBeforeSwitching value always overwrite", async () => {
			expect(await getTheaterModeBehaviorOption()).toStrictEqual({
				positionPlayerBar: "outside",
				alwaysDisplayPlayerBar: true,
				inheritPositionPlayerBarBeforeSwitching: ["defaultView"],
			});
			await setTheaterModeBehaviorOption({
				alwaysDisplayPlayerBar: false,
				inheritPositionPlayerBarBeforeSwitching: [
					"defaultView",
					"theaterMode",
					"fullscreen",
				],
			});
			expect(await getTheaterModeBehaviorOption()).toStrictEqual({
				positionPlayerBar: "outside",
				alwaysDisplayPlayerBar: false,
				inheritPositionPlayerBarBeforeSwitching: [
					"defaultView",
					"theaterMode",
					"fullscreen",
				],
			});
		});
	});

	describe(setFullscreenBehaviorOption.name, () => {
		test("should update with merged current values", async () => {
			expect(await getFullscreenBehaviorOption()).toStrictEqual({
				positionPlayerBar: "inside",
				alwaysDisplayPlayerBar: true,
				inheritPositionPlayerBarBeforeSwitching: [],
			});
			await setFullscreenBehaviorOption({
				alwaysDisplayPlayerBar: true,
				inheritPositionPlayerBarBeforeSwitching: ["theaterMode"],
			});
			expect(await getFullscreenBehaviorOption()).toStrictEqual({
				positionPlayerBar: "inside",
				alwaysDisplayPlayerBar: true,
				inheritPositionPlayerBarBeforeSwitching: ["theaterMode"],
			});
		});
	});
	test("should inheritPositionPlayerBarBeforeSwitching value always overwrite", async () => {
		expect(await getFullscreenBehaviorOption()).toStrictEqual({
			positionPlayerBar: "inside",
			alwaysDisplayPlayerBar: true,
			inheritPositionPlayerBarBeforeSwitching: [],
		});
		await setFullscreenBehaviorOption({
			alwaysDisplayPlayerBar: false,
			inheritPositionPlayerBarBeforeSwitching: [
				"defaultView",
				"theaterMode",
				"fullscreen",
			],
		});
		expect(await getFullscreenBehaviorOption()).toStrictEqual({
			positionPlayerBar: "inside",
			alwaysDisplayPlayerBar: false,
			inheritPositionPlayerBarBeforeSwitching: [
				"defaultView",
				"theaterMode",
				"fullscreen",
			],
		});
		await setFullscreenBehaviorOption({
			inheritPositionPlayerBarBeforeSwitching: ["theaterMode"],
		});
		expect(await getFullscreenBehaviorOption()).toStrictEqual({
			positionPlayerBar: "inside",
			alwaysDisplayPlayerBar: false,
			inheritPositionPlayerBarBeforeSwitching: ["theaterMode"],
		});
	});
});
