import { describe, expect, test } from "vitest";
import {
	judgeCurrentVideoPlayerMode,
	convertAttrToVideoPlayerMode,
} from "./index.js";

describe(judgeCurrentVideoPlayerMode.name, () => {
	test.todo.each`
		element                         | expected
		${"TODO:ここをfakeのdomにする"} | ${"default-layout"}
		${"theater"}                    | ${"theater"}
		${"fullscreen"}                 | ${"fullscreen"}
	`(
		`${judgeCurrentVideoPlayerMode.name} returns $expected when $element`,
		({ element, expected }) => {
			expect(judgeCurrentVideoPlayerMode(element)).toBe(expected);
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
