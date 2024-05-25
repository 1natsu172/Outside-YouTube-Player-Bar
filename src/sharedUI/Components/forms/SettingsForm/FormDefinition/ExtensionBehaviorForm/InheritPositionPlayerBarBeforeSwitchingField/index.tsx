import { type ComboboxData, MultiSelect } from "@mantine/core";
import { FormField } from "../../../../layouts/FormField.js";
import type { FormLogic } from "../formLogic.js";

export const InheritPositionPlayerBarBeforeSwitching = ({
	comboboxData,
	formLogic,
}: {
	comboboxData: ComboboxData;
	formLogic: FormLogic;
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
				placeholder="Pick value"
				defaultValue={data.inheritPositionPlayerBarBeforeSwitching}
				data={comboboxData}
				disabled={_isLoading}
				onChange={(e) => {
					mutate({
						inheritPositionPlayerBarBeforeSwitching:
							// FIXME: mantineにcontributeする
							e as typeof data.inheritPositionPlayerBarBeforeSwitching,
					});
				}}
				checkIconPosition="right"
				dropdownOpened
			/>
		</FormField>
	);
};
