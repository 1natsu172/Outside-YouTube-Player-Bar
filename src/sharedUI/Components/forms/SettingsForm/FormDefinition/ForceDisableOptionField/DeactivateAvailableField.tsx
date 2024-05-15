import { getForceDisableOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import {
	checkAboutForceDisable,
	switchContinueForceDisableForNow,
} from "@/core/services/optionsServices/forceDisable.service.js";
import { Checkbox, Group, Paper, Text } from "@mantine/core";
import type { QueryKey } from "@tanstack/react-query";
import { AutoSaveForFormField } from "../../../utils/useAutoSaveForm.js";
import { FormField } from "../../FormField.js";

export const DeactivateAvailableField = ({
	queryKey,
}: { queryKey: QueryKey }) => {
	return (
		<AutoSaveForFormField
			option={{
				useSuspenseQueryArgs: [{ queryKey, queryFn: checkAboutForceDisable }],
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
