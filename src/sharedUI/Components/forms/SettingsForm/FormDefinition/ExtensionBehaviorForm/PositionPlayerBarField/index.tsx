import { SegmentedControl, type SegmentedControlItem } from "@mantine/core";
import { FormField } from "../../../../layouts/FormField.js";
import type { FormLogic } from "../formLogic.js";

export const PositionPlayerBar = ({
	formLogic,
	segmentedControlItems,
}: {
	segmentedControlItems: SegmentedControlItem[];
	formLogic: FormLogic;
}) => {
	const [{ data, isLoading }, { mutate, isPending }] = formLogic;
	const _isLoading = isLoading || isPending;

	return (
		<FormField
			title={browser.i18n.getMessage(
				"settings_userOption_positionPlayerBar_title",
			)}
			isLoading={_isLoading}
			formState={data}
		>
			<SegmentedControl
				data={segmentedControlItems}
				value={data.positionPlayerBar}
				onChange={(e) => {
					mutate({
						positionPlayerBar: e as typeof data.positionPlayerBar,
					});
				}}
				fullWidth
				disabled={_isLoading}
			/>
		</FormField>
	);
};
