import test from "node:test";
import { proxy } from "valtio";
import { watch } from "valtio/utils";
import { expect } from "vitest";

const a = proxy({
	aoo: 1,
	aoo2: 2,
});

const b = proxy({
	boo: 1,
	boo2: 2,
});

const c = proxy({
	coo: 1,
	coo2: 2,
});

test.only("a", () => {
	watch((get) => {
		console.log("log1");
		const n = get(a);
		console.log("log1", n);
	});
	watch((get) => {
		const n = get(a);
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
