import { switchDebugMode } from "@/core/services/optionsServices/extensionMetaOptions.service.js";
import { switchForceDisable } from "@/core/services/optionsServices/forceDisable.service.js";
import { Button, Switch, Text, Modal, Paper, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FormGroup } from "../FormGroup.js";
import { FormField } from "../FormField.js";
import { AutoSaveForFormField } from "../../utils/useAutoSaveForm.js";
import type { FormDefs } from "./formDefinition.types.js";
import {
	getDebugModeOption,
	getForceDisableOption,
} from "@/core/presenters/storagePresenter/options.presenter.js";

/**
 * @description Enumerate component implementations
 */
export const ExtensionMetaOptionsFormDefs: FormDefs = new Map([
	[
		"Form:ForceDisable",
		{
			FormElement: ({ formId }) => {
				const queryKey = [formId];

				return (
					<FormGroup title="">
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getForceDisableOption },
								],
								useMutationArgs: [{ mutationFn: switchForceDisable }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => {
								const isSwitchToActivate = data.value === false;
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
											>
												<Paper>
													<Text size="sm">
														{isSwitchToActivate
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
															color={isSwitchToActivate ? "red" : "blue"}
															onClick={() => {
																mutate(!data.value);
															}}
														>
															{browser.i18n.getMessage("fixturewords_confirm")}
														</Button>
													</Group>
												</Paper>
											</Modal>
											<Button
												onClick={open}
												color={isSwitchToActivate ? "red" : "blue"}
												disabled={isLoading || isPending}
											>
												{isSwitchToActivate
													? browser.i18n.getMessage("fixturewords_enabling")
													: browser.i18n.getMessage("fixturewords_disabling")}
											</Button>
										</>
									</FormField>
								);
							}}
						</AutoSaveForFormField>
					</FormGroup>
				);
			},
		},
	],
	[
		"Form:DebugMode",
		{
			FormElement: ({ formId }) => {
				const queryKey = [formId];

				return (
					<FormGroup title="">
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getDebugModeOption },
								],
								useMutationArgs: [{ mutationFn: switchDebugMode }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									title={browser.i18n.getMessage(
										"settings_metaOption_debugMode_title",
									)}
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
					</FormGroup>
				);
			},
		},
	],
]);
