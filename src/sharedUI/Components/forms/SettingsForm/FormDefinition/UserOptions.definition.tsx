import { videoPlayerModeKeysWithoutNone } from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { getShowOpenSettingsIconOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import { setShowOpenSettingsIconOption } from "@/core/services/optionsServices/userOptions.service.js";
import { Switch } from "@mantine/core";
import { FormField } from "../../layouts/FormField.js";
import { FormGroup } from "../../layouts/FormGroup.js";
import { AutoSaveForFormField } from "../../utils/useAutoSaveForm.js";
import { ExtensionBehaviorForm } from "./ExtensionBehaviorForm/index.js";
import type { FormDefs } from "./formDefinition.types.js";

/**
 * @description Enumerate component implementations
 * About the ExtensionBehavior
 */
export const ExtensionBehaviorOptionsFormDefs = new Map(
	[...videoPlayerModeKeysWithoutNone()].map((videoPlayerMode) => {
		return [
			`Form:${videoPlayerMode}`,
			{
				FormElement: () => {
					return <ExtensionBehaviorForm videoModeKey={videoPlayerMode} />;
				},
			},
		];
	}),
) satisfies FormDefs;

/**
 * @description Enumerate component implementations
 * About the UIEnhanceOptions
 */
export const UiEnhanceOptionsFormDefs: FormDefs = new Map([
	[
		"Form:ShowOpenSettingsIcon",
		{
			FormElement: ({ formId }) => {
				const queryKey = [formId];
				return (
					<FormGroup title="">
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getShowOpenSettingsIconOption },
								],
								useMutationArgs: [
									{ mutationFn: setShowOpenSettingsIconOption },
								],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									title={browser.i18n.getMessage(
										"settings_userOption_showOpenSettingsIcon_title",
									)}
									description={browser.i18n.getMessage(
										"settings_userOption_showOpenSettingsIcon_description",
									)}
									isLoading={isPending}
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
