import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import { createInheritablePositionPlayerBarData } from "@/core/presenters/storagePresenter/options.presenter.js";
import type { ComboboxData } from "@mantine/core";

export function createInheritablePositionPlayerBarSelect(
	mode: VideoPlayerModeWithoutNone,
) {
	const dataset = createInheritablePositionPlayerBarData(mode);

	const items = dataset.map<ComboboxData[number]>((modeKey) => {
		const from = browser.i18n.getMessage(`metawords_${modeKey}`);
		const to = browser.i18n.getMessage(`metawords_${mode}`);
		return {
			label: `${from} → ${to}`,
			value: modeKey,
		};
	});

	return items;
}
