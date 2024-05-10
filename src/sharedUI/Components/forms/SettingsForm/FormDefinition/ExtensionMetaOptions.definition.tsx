import { switchDebugMode } from "@/core/services/optionsServices/extensionMetaOptions.service.js";
import {
	SegmentedControl,
	Switch,
	type SegmentedControlItem,
} from "@mantine/core";
import { FormGroup } from "../FormGroup.js";
import { FormField } from "../FormField.js";
import { AutoSaveForFormField } from "../../utils/useAutoSaveForm.js";
import type { FormDefs } from "./formDefinition.types.js";
import {
	getDebugModeOption,
	getForceDisableOption,
} from "@/core/presenters/storagePresenter/options.presenter.js";
import { setForceDisableOption } from "@/core/usecases/options.usecase.js";

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
								useMutationArgs: [{ mutationFn: setForceDisableOption }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
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
