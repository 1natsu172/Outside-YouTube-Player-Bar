import { beforeEach, describe, expect, test } from "vitest";
import { _generalUpdate } from "./options.usecase.js";
import {
	createStorageConfig,
	defineItem,
} from "@/core/infrastructures/storage/index.js";

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
