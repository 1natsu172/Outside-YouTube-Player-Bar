import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import { Switch } from "@mantine/core";
import { FormField } from "../../../../layouts/FormField.js";
import type { FormLogic } from "../formLogic.js";

export const AlwaysDisplayPlayerBarField = ({
	formLogic,
	videoModeKey,
}: {
	formLogic: FormLogic;
	videoModeKey: VideoPlayerModeWithoutNone;
}) => {
	const [{ data, isLoading }, { mutate, isPending }] = formLogic;
	const _isLoading = isLoading || isPending;
	return (
		<FormField
			isLoading={_isLoading}
			title={browser.i18n.getMessage(
				"settings_userOption_alwaysDisplayPlayerBar_title",
			)}
			description={browser.i18n.getMessage(
				"settings_userOption_alwaysDisplayPlayerBar_description",
			)}
			formState={data}
		>
			<Switch
				size="lg"
				checked={data.alwaysDisplayPlayerBar}
				onChange={(e) => {
					mutate({ alwaysDisplayPlayerBar: e.target.checked });
				}}
				offLabel="OFF"
				onLabel="ON"
				disabled={_isLoading}
				data-testid={`${videoModeKey}-alwaysDisplayPlayerBar`}
			/>
		</FormField>
	);
};
