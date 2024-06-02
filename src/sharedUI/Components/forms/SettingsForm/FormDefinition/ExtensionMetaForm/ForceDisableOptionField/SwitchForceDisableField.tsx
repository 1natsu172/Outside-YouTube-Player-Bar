import { getForceDisableOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import {
	checkAboutForceDisable,
	switchForceDisable,
} from "@/core/services/optionsServices/forceDisable.service.js";
import { FormField } from "@/sharedUI/Components/forms/layouts/FormField.js";
import { Button, Group, Modal, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useAutoSaveForm } from "../../../../utils/useAutoSaveForm.js";
import { DeactivateAvailableField } from "./DeactivateAvailableField.js";

export const SwitchForceDisableField = () => {
	const [{ data, isLoading }, { mutate, isPending }] = useAutoSaveForm({
		useSuspenseQueryArgs: [
			{
				queryKey: [checkAboutForceDisable.name],
				queryFn: checkAboutForceDisable,
			},
		],
		useMutationArgs: [{ mutationFn: switchForceDisable }],
	});

	const { data: debugRawValues } = useQuery({
		queryKey: [getForceDisableOption.name],
		queryFn: getForceDisableOption,
	});

	const canSwitchToActivate = data.isDisabling === false;

	const [opened, { open, close }] = useDisclosure(false);

	return (
		<FormField
			title={browser.i18n.getMessage("settings_metaOption_forceDisable_title")}
			description={browser.i18n.getMessage(
				"settings_metaOption_forceDisable_description",
			)}
			isLoading={isPending}
			formState={{ data, debugRawValues }}
		>
			<>
				<Modal
					opened={opened}
					onClose={close}
					title={browser.i18n.getMessage("fixturewords_confirmation_title")}
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
								color={canSwitchToActivate ? "yellow" : "blue"}
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
					color={canSwitchToActivate ? "yellow" : "blue"}
					autoContrast={false}
					disabled={isLoading || isPending}
				>
					{canSwitchToActivate
						? browser.i18n.getMessage("fixturewords_enabling")
						: browser.i18n.getMessage("fixturewords_disabling")}
				</Button>
				{data.isShowUpdateRed && (
					<Paper>
						<DeactivateAvailableField />
					</Paper>
				)}
			</>
		</FormField>
	);
};
