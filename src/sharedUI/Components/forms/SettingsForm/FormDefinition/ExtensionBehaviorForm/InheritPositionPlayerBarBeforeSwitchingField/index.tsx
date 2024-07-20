import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import { type ComboboxData, MultiSelect } from "@mantine/core";
import { FormField } from "../../../../layouts/FormField.js";
import type { FormLogic } from "../formLogic.js";
import style from "./index.module.css";

export const InheritPositionPlayerBarBeforeSwitching = ({
	comboboxData,
	formLogic,
	videoModeKey,
}: {
	comboboxData: ComboboxData;
	formLogic: FormLogic;
	videoModeKey: VideoPlayerModeWithoutNone;
}) => {
	const [{ data, isLoading }, { mutate, isPending }] = formLogic;
	const _isLoading = isLoading || isPending;

	return (
		<FormField
			isLoading={_isLoading}
			title={browser.i18n.getMessage(
				"settings_userOption_inheritPositionPlayerBarBeforeSwitching_title",
			)}
			description={browser.i18n.getMessage(
				"settings_userOption_inheritPositionPlayerBarBeforeSwitching_description",
			)}
			formState={data}
		>
			<MultiSelect
				placeholder="Pick pattern"
				defaultValue={data.inheritPositionPlayerBarBeforeSwitching}
				data={comboboxData}
				disabled={_isLoading}
				onChange={(e) => {
					mutate({
						inheritPositionPlayerBarBeforeSwitching:
							e as typeof data.inheritPositionPlayerBarBeforeSwitching,
					});
				}}
				checkIconPosition="right"
				className={style.multiselect}
				data-testid={`${videoModeKey}-inheritPositionPlayerBarBeforeSwitching`}
				w={"100%"}
			/>
		</FormField>
	);
};
