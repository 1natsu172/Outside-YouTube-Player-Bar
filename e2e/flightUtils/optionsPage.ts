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
			const input = page.getByTestId(
				`${videoPlayerMode}-alwaysDisplayPlayerBar`,
			);
			return {
				// for statement checking
				input,
				// for mutating input because the input element size is 0x0(at mantine).Playwright can't click unvisible element… :( ref: https://github.com/microsoft/playwright/issues/14133
				inputParent: await input.evaluateHandle((el) => el.parentElement ?? el),
			};
		},
	};
	return pageHandlers;
}
