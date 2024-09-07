import { proxy } from "valtio";
import { watch } from "valtio/utils";
import { subscribe } from "valtio/vanilla";
import { describe, expect, test } from "vitest";

const a = proxy({
	aoo: 1,
	aoo2: 2,
	aoo3: {
		color: "red",
		sparkle: true,
	},
});

const _b = proxy({
	boo: 1,
	boo2: 2,
});

const c = proxy({
	coo: 1,
	coo2: 2,
});

describe("valtio check behavior", () => {
	test("a", () => {
		watch((get) => {
			console.log("log1");
			const n = get(a);
			console.log("log1", n);
		});
		watch((get) => {
			const _n = get(a);
			const _b = get(a);
			const _c = get(c);
			console.log("log2", a.aoo, a.aoo2, c);
		});
		watch((get) => {
			console.log("log3");
			const n = get(c);
			console.log("log3", n);
		});

		a.aoo = 1;
		expect(1).toBe(1);
	});

	test("partial update", () => {
		const hoge = proxy({ a: 1, b: 2, c: 3 });
		hoge.a = 100;

		expect(hoge).toStrictEqual({ a: 100, b: 2, c: 3 });

		hoge.b = 200;

		expect(hoge).toStrictEqual({ a: 100, b: 200, c: 3 });
	});

	test("partial update with multiple prop", () => {
		const hoge = proxy({ testObj1: { a: 1, b: 2, c: 3 } });

		subscribe(hoge, () => {
			console.log("a", hoge.testObj1.a);
		});

		const contentObj = { a: 100, b: 200 };

		hoge.testObj1 = { ...hoge.testObj1, ...contentObj };

		expect(hoge).toStrictEqual({ testObj1: { a: 100, b: 200, c: 3 } });

		hoge.testObj1.a = 1000;
	});
});
