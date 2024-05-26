import {
	checkAboutForceDisable,
	switchContinueForceDisableForNow,
} from "@/core/services/optionsServices/forceDisable.service.js";
import { Checkbox, Group, Paper } from "@mantine/core";
import { FormField } from "../../../../layouts/FormField.js";
import { AutoSaveForFormField } from "../../../../utils/useAutoSaveForm.js";

export const DeactivateAvailableField = () => {
	return (
		<AutoSaveForFormField
			option={{
				useSuspenseQueryArgs: [
					{
						queryKey: [checkAboutForceDisable.name],
						queryFn: checkAboutForceDisable,
					},
				],
				useMutationArgs: [{ mutationFn: switchContinueForceDisableForNow }],
			}}
		>
			{([{ data, isLoading }, { mutate, isPending }]) => {
				return (
					<FormField
						title={browser.i18n.getMessage(
							"settings_metaOption_forceDisable_availableDeactivate_long",
						)}
						isLoading={isPending}
						formState={{ data }}
					>
						<Paper>
							<Group justify="flex-end">
								<Checkbox
									label={browser.i18n.getMessage(
										"settings_metaOption_forceDisable_continue_currently_label",
									)}
									labelPosition="left"
									onChange={(event) =>
										mutate({ isContinue: event.currentTarget.checked })
									}
									disabled={isLoading || isPending}
								/>
							</Group>
						</Paper>
					</FormField>
				);
			}}
		</AutoSaveForFormField>
	);
};
