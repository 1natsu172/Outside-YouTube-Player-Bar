import { getDebugModeOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import { switchDebugMode } from "@/core/services/optionsServices/extensionMetaOptions.service.js";
import { Switch } from "@mantine/core";
import { FormField } from "../../../../layouts/FormField.js";
import { AutoSaveForFormField } from "../../../../utils/useAutoSaveForm.js";

export const SwitchDebugModeField = () => {
	return (
		<AutoSaveForFormField
			option={{
				useSuspenseQueryArgs: [
					{ queryKey: [getDebugModeOption.name], queryFn: getDebugModeOption },
				],
				useMutationArgs: [{ mutationFn: switchDebugMode }],
			}}
		>
			{([{ data, isLoading }, { mutate, isPending }]) => (
				<FormField
					title={browser.i18n.getMessage("settings_metaOption_debugMode_title")}
					description={browser.i18n.getMessage(
						"settings_metaOption_debugMode_description",
					)}
					isLoading={isPending}
					formState={{ data }}
				>
					<Switch
						size="lg"
						checked={data}
						onChange={(e) => {
							mutate(e.target.checked);
						}}
						offLabel="OFF"
						onLabel="ON"
						disabled={isLoading || isPending}
					/>
				</FormField>
			)}
		</AutoSaveForFormField>
	);
};
