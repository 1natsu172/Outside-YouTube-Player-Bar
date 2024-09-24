import { proxy } from "valtio/vanilla";
import { beforeEach, describe, expect, test } from "vitest";
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

const testProxy = proxy(fixtureState);
const resetTestProxy = resetProxyState(testProxy);

beforeEach(() => {
	resetTestProxy();
});

describe(resetProxyState.name, () => {
	test("should reset to the proxy object", () => {
		testProxy.kitchen.light.maker.address.city = "fukuoka";
		expect(testProxy.kitchen.light.maker.address.city).toBe("fukuoka");

		resetTestProxy();
		expect(testProxy.kitchen.light.maker.address.city).toBe("ehime");
	});
});
