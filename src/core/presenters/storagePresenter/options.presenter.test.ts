import { describe, expect, test } from "vitest";
import {
	createInheritablePositionPlayerBarData,
	resolveInheritPositionPlayerBar,
} from "./options.presenter.js";

describe(resolveInheritPositionPlayerBar.name, () => {
	test.each`
		settings                          | fromPosition     | expected
		${[]}                             | ${"defaultView"} | ${false}
		${[]}                             | ${"theaterMode"} | ${false}
		${[]}                             | ${"fullscreen"}  | ${false}
		${[]}                             | ${"none"}        | ${false}
		${["none"]}                       | ${"none"}        | ${false}
		${["defaultView"]}                | ${"defaultView"} | ${true}
		${["defaultView"]}                | ${"theaterMode"} | ${false}
		${["defaultView"]}                | ${"fullscreen"}  | ${false}
		${["theaterMode"]}                | ${"defaultView"} | ${false}
		${["theaterMode"]}                | ${"theaterMode"} | ${true}
		${["theaterMode"]}                | ${"fullscreen"}  | ${false}
		${["fullscreen"]}                 | ${"defaultView"} | ${false}
		${["fullscreen"]}                 | ${"theaterMode"} | ${false}
		${["fullscreen"]}                 | ${"fullscreen"}  | ${true}
		${["defaultView", "theaterMode"]} | ${"defaultView"} | ${true}
		${["defaultView", "theaterMode"]} | ${"theaterMode"} | ${true}
		${["defaultView", "theaterMode"]} | ${"fullscreen"}  | ${false}
		${["defaultView", "fullscreen"]}  | ${"defaultView"} | ${true}
		${["defaultView", "fullscreen"]}  | ${"theaterMode"} | ${false}
		${["defaultView", "fullscreen"]}  | ${"fullscreen"}  | ${true}
		${["theaterMode", "fullscreen"]}  | ${"defaultView"} | ${false}
		${["theaterMode", "fullscreen"]}  | ${"theaterMode"} | ${true}
		${["theaterMode", "fullscreen"]}  | ${"fullscreen"}  | ${true}
	`(
		`${resolveInheritPositionPlayerBar.name} return expected $expected when settings=$settings fromPosition=$fromPosition`,
		({ settings, fromPosition, expected }) => {
			expect(
				resolveInheritPositionPlayerBar({
					inheritPositionSetting: settings,
					fromPosition,
				}),
			).toBe(expected);
		},
	);
});

describe(createInheritablePositionPlayerBarData.name, () => {
	test.each`
		mode             | expected
		${"defaultView"} | ${["theaterMode", "fullscreen"]}
		${"theaterMode"} | ${["defaultView", "fullscreen"]}
		${"fullscreen"}  | ${["defaultView", "theaterMode"]}
	`(
		`${createInheritablePositionPlayerBarData.name} return expected $expected when mode:$mode`,
		({ mode, expected }) => {
			expect(createInheritablePositionPlayerBarData(mode)).toStrictEqual(
				expected,
			);
		},
	);
});
