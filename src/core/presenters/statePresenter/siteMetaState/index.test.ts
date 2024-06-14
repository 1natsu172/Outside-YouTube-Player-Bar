// @vitest-environment happy-dom

import type { elementAttributes } from "@/core/mains/meta.js";
import { convertToNamedNodeMapLike } from "@/utils/domUtils/attr.js";
import { describe, expect, test } from "vitest";
import {
	convertAttrToVideoPlayerMode,
	judgeCurrentVideoPlayerMode,
} from "./index.js";

function createElementWithAttr(
	attrs: [
		qualifiedName: ValueOf<typeof elementAttributes.playerMode>,
		value?: string,
	][],
) {
	const el = document.createElement("div");
	for (const [qualifiedName, value = ""] of attrs) {
		el.setAttribute(qualifiedName, value);
	}
	return el;
}

describe(judgeCurrentVideoPlayerMode.name, () => {
	test.each`
		element                                                                     | expected
		${createElementWithAttr([["default-layout"]])}                              | ${"default-layout"}
		${createElementWithAttr([["theater"]])}                                     | ${"theater"}
		${createElementWithAttr([["fullscreen"]])}                                  | ${"fullscreen"}
		${createElementWithAttr([["default-layout"], ["theater"]])}                 | ${"theater"}
		${createElementWithAttr([["theater"], ["fullscreen"]])}                     | ${"fullscreen"}
		${createElementWithAttr([["default-layout"], ["fullscreen"]])}              | ${"fullscreen"}
		${createElementWithAttr([["default-layout"], ["theater"], ["fullscreen"]])} | ${"fullscreen"}
	`(
		`${judgeCurrentVideoPlayerMode.name} returns $expected when $element`,
		({ element, expected }) => {
			expect(
				judgeCurrentVideoPlayerMode(
					convertToNamedNodeMapLike(element.attributes),
				),
			).toBe(expected);
		},
	);
});

describe(convertAttrToVideoPlayerMode.name, () => {
	test.each`
		attr                | expected
		${"default-layout"} | ${"defaultView"}
		${"theater"}        | ${"theaterMode"}
		${"fullscreen"}     | ${"fullscreen"}
		${undefined}        | ${"none"}
	`(
		`${convertAttrToVideoPlayerMode.name} returns $expected when $attr`,
		({ attr, expected }) => {
			expect(convertAttrToVideoPlayerMode(attr)).toBe(expected);
		},
	);
});
