import { getShowOpenSettingsIconOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import { setShowOpenSettingsIconOption } from "@/core/services/optionsServices/userOptions.service.js";
import { Switch } from "@mantine/core";
import { FormField } from "../../../layouts/FormField.js";
import { FormGroup } from "../../../layouts/FormGroup.js";
import { useAutoSaveForm } from "../../../utils/useAutoSaveForm.js";

export const ShowOpenSettingsIconForm = () => {
	const [{ data, isLoading }, { mutate, isPending }] = useAutoSaveForm({
		useSuspenseQueryArgs: [
			{
				queryKey: [getShowOpenSettingsIconOption.name],
				queryFn: getShowOpenSettingsIconOption,
			},
		],
		useMutationArgs: [{ mutationFn: setShowOpenSettingsIconOption }],
	});
	const _isLoading = isLoading || isPending;

	return (
		<FormGroup title="">
			<FormField
				title={browser.i18n.getMessage(
					"settings_userOption_showOpenSettingsIcon_title",
				)}
				description={browser.i18n.getMessage(
					"settings_userOption_showOpenSettingsIcon_description",
				)}
				isLoading={_isLoading}
				formState={data}
			>
				<Switch
					size="lg"
					checked={data}
					onChange={(e) => {
						mutate(e.target.checked);
					}}
					offLabel="OFF"
					onLabel="ON"
					disabled={_isLoading}
				/>
			</FormField>
		</FormGroup>
	);
};
