import { getForceDisableOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import {
	checkAboutForceDisable,
	switchForceDisable,
} from "@/core/services/optionsServices/forceDisable.service.js";
import { Button, Group, Modal, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { QueryKey } from "@tanstack/react-query";
import { AutoSaveForFormField } from "../../../utils/useAutoSaveForm.js";
import { FormField } from "../../FormField.js";

export const SwitchForceDisableField = ({
	queryKey,
}: { queryKey: QueryKey }) => {
	return (
		<AutoSaveForFormField
			option={{
				useSuspenseQueryArgs: [{ queryKey, queryFn: checkAboutForceDisable }],
				useMutationArgs: [{ mutationFn: switchForceDisable }],
			}}
		>
			{([{ data, isLoading }, { mutate, isPending }]) => {
				const canSwitchToActivate = data.isDisabling === false;
				const [opened, { open, close }] = useDisclosure(false);
				return (
					<FormField
						title={browser.i18n.getMessage(
							"settings_metaOption_forceDisable_title",
						)}
						description={browser.i18n.getMessage(
							"settings_metaOption_forceDisable_description",
						)}
						isLoading={isPending}
						formState={{ data }}
					>
						<>
							<Modal
								opened={opened}
								onClose={close}
								title={browser.i18n.getMessage(
									"fixturewords_confirmation_title",
								)}
								transitionProps={{ transition: "fade" }}
								centered
							>
								<Paper>
									<Text size="sm">
										{canSwitchToActivate
											? browser.i18n.getMessage(
													"settings_metaOption_forceDisable_activateAlert",
												)
											: browser.i18n.getMessage(
													"settings_metaOption_forceDisable_deactivateAlert",
												)}
									</Text>
									<Group justify="flex-end">
										<Button variant="default" onClick={close}>
											{browser.i18n.getMessage("fixturewords_cancel")}
										</Button>
										<Button
											color={canSwitchToActivate ? "red" : "blue"}
											onClick={() => {
												mutate(!data.isDisabling);
											}}
										>
											{browser.i18n.getMessage("fixturewords_confirm")}
										</Button>
									</Group>
								</Paper>
							</Modal>
							<Button
								onClick={open}
								color={canSwitchToActivate ? "red" : "blue"}
								disabled={isLoading || isPending}
							>
								{canSwitchToActivate
									? browser.i18n.getMessage("fixturewords_enabling")
									: browser.i18n.getMessage("fixturewords_disabling")}
							</Button>
						</>
					</FormField>
				);
			}}
		</AutoSaveForFormField>
	);
};
