import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import { SegmentedControl, type SegmentedControlItem } from "@mantine/core";
import { FormField } from "../../../../layouts/FormField.js";
import type { FormLogic } from "../formLogic.js";

export const PositionPlayerBar = ({
	formLogic,
	segmentedControlItems,
	videoModeKey,
}: {
	segmentedControlItems: SegmentedControlItem[];
	formLogic: FormLogic;
	videoModeKey: VideoPlayerModeWithoutNone;
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
				size="sm"
				color={"myColor.6"}
				fullWidth
				disabled={_isLoading}
				data-testid={`${videoModeKey}-positionPlayerBar`}
			/>
		</FormField>
	);
};
