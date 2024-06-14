import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import type { Page } from "@playwright/test";

type Context = {
	extensionId: string;
	videoPlayerMode: VideoPlayerModeWithoutNone;
};

export async function openOptions(
	page: Page,
	{ extensionId, videoPlayerMode }: Context,
) {
	await page.goto(`chrome-extension://${extensionId}/options.html`);

	const pageHandlers = {
		getAlwaysDisplayPlayerBar: async () => {
			const locator = page.getByTestId(
				`${videoPlayerMode}-alwaysDisplayPlayerBar`,
			);
			return {
				// for statement checking
				input: locator,
				// for mutating input because the input element size is 0x0(at mantine).Playwright can't click unvisible element… :( ref: https://github.com/microsoft/playwright/issues/14133
				inputParent: await locator.evaluateHandle(
					(el) => el.parentElement ?? el,
				),
			};
		},
		getPositionPlayerBar: async () => {
			const locator = page.getByTestId(`${videoPlayerMode}-positionPlayerBar`);
			const insideInput = locator
				.getByRole("radio")
				.and(page.locator('[value="inside"]'));

			const outsideInput = locator
				.getByRole("radio")
				.and(page.locator('[value="outside"]'));

			return {
				inside: {
					// for statement checking
					input: insideInput,
					// for click sibling label element
					inputHandle: insideInput.locator("~ label"),
				},
				outside: {
					input: outsideInput,
					inputHandle: outsideInput.locator("~ label"),
				},
			};
		},
	};
	return pageHandlers;
}
