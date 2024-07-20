import { beforeEach } from "node:test";
import { proxy } from "valtio/vanilla";
import { describe, expect, test } from "vitest";
import { resetProxyState } from "./resetProxyState.js";

const fixtureState = {
	kitchen: {
		size: {
			w: 20,
			h: 50,
		},
		light: {
			maker: {
				name: "hoge",
				address: { country: "japan", city: "ehime", town: "aaa-bbb-ccc" },
				tel: "0120-0000-0000",
			},
			count: 4,
			plug: [{ socketType: "A", withUSB: true }],
		},
	},
	bathroom: {
		size: {
			w: 25,
			h: 40,
		},
		light: {
			maker: {
				name: "foge",
				address: { country: "thai", city: "bangkok", town: "ttt-yyy-iii" },
				tel: "0120-0000-0000",
			},
			count: 4,
			plug: [{ socketType: "B", withUSB: false }],
		},
	},
};

let testProxy = proxy(fixtureState);

beforeEach(() => {
	testProxy = proxy(fixtureState);
});

describe(resetProxyState.name, () => {
	test("should reset to the proxy object", () => {
		const resetTestProxy = resetProxyState(testProxy);
		testProxy.kitchen.light.maker.address.city = "fukuoka";
		expect(testProxy.kitchen.light.maker.address.city).toBe("fukuoka");

		resetTestProxy();
		expect(testProxy.kitchen.light.maker.address.city).toBe("ehime");
	});

	test("should be possible to pass the initial value at any time and reset it to that value", () => {
		testProxy.kitchen.light.maker.address.city = "fukuoka";
		expect(testProxy.kitchen.light.maker.address.city).toBe("fukuoka");

		const resetTestProxy = resetProxyState(testProxy);
		resetTestProxy(fixtureState);
		expect(testProxy.kitchen.light.maker.address.city).toBe("ehime");
	});
});
