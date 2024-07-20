import type { SegmentedControlItem } from "@mantine/core";

export const createPlayerBarPisitonSelect = (): SegmentedControlItem[] => [
	{
		label: browser.i18n.getMessage(
			"settings_userOption_positionPlayerBar_inside",
		),
		value: "inside",
	},
	{
		label: browser.i18n.getMessage(
			"settings_userOption_positionPlayerBar_outside",
		),
		value: "outside",
	},
];
