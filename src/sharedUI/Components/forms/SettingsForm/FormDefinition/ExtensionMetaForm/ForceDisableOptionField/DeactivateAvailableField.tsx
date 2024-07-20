import {
	checkAboutForceDisable,
	switchContinueForceDisableForNow,
} from "@/core/services/optionsServices/forceDisable.service.js";
import { Checkbox, Flex, Text } from "@mantine/core";
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
			{([{ isLoading }, { mutate, isPending }]) => {
				return (
					<Flex direction="column" mt={5} gap={5} align={"center"}>
						<Text fz={"h5"} fw={"bold"} c={"myColor.3"}>
							{browser.i18n.getMessage(
								"settings_metaOption_forceDisable_availableDeactivate_long",
							)}
						</Text>
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
					</Flex>
				);
			}}
		</AutoSaveForFormField>
	);
};
