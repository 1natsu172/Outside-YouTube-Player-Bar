import { switchDebugMode } from "@/core/services/optionsServices/extensionMetaOptions.service.js";
import {
	setDefaultViewBehaviorOption,
	setTheaterModeBehaviorOption,
	setFullscreenBehaviorOption,
	setShowOpenSettingsIconOption,
} from "@/core/services/optionsServices/userOptions.service.js";
import {
	getDefaultViewBehaviorOption,
	getFullscreenBehaviorOption,
	getShowOpenSettingsIconOption,
	getTheaterModeBehaviorOption,
} from "@/core/presenters/storagePresenter/options.presenter.js";
import {
	SegmentedControl,
	Switch,
	type SegmentedControlItem,
} from "@mantine/core";
import { FormGroup } from "../FormGroup.js";
import { FormField } from "../FormField.js";
import { AutoSaveForFormField } from "../../utils/useAutoSaveForm.js";
import type { FormDefs } from "./formDefinition.types.js";

const playerBarPisitonSelect: SegmentedControlItem[] = [
	{
		label: browser.i18n.getMessage(
			"settings_userOption_positionPlayerBar_inside",
		),
		value: "inside",
	},
	{
		label: browser.i18n.getMessage(
			"settings_userOption_positionPlayerBar_outside",
		),
		value: "outside",
	},
];

/**
 * @description Enumerate component implementations
 * About the ExtensionBehavior
 */
export const ExtensionBehaviorOptionsFormDefs: FormDefs = new Map([
	[
		"Form:DefaultViewBehavior",
		{
			FormElement: ({ formId }) => {
				const queryKey = [formId];
				return (
					<FormGroup
						title={browser.i18n.getMessage(
							"settings_userOption_defaultViewBehavior_title",
						)}
						// formState={data} // TODO: レイアウトだけ後で整える
					>
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getDefaultViewBehaviorOption },
								],
								useMutationArgs: [{ mutationFn: setDefaultViewBehaviorOption }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									title={browser.i18n.getMessage(
										"settings_userOption_positionPlayerBar_title",
									)}
									isLoading={isPending}
									formState={data}
								>
									<SegmentedControl
										data={playerBarPisitonSelect}
										value={data.positionPlayerBar}
										onChange={(e) => {
											mutate({
												positionPlayerBar: e as typeof data.positionPlayerBar,
											});
										}}
										fullWidth
										disabled={isLoading || isPending}
									/>
								</FormField>
							)}
						</AutoSaveForFormField>
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getDefaultViewBehaviorOption },
								],
								useMutationArgs: [{ mutationFn: setDefaultViewBehaviorOption }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									isLoading={isPending}
									title={browser.i18n.getMessage(
										"settings_userOption_alwaysApplyDefaultBehaviorSettings_title",
										browser.i18n.getMessage("metawords_defaultView"),
									)}
									description={browser.i18n.getMessage(
										"settings_userOption_alwaysApplyDefaultBehaviorSettings_description",
									)}
									formState={data}
								>
									<Switch
										size="lg"
										checked={data.alwaysApplyDefaultBehaviorSettings}
										onChange={(e) => {
											mutate({
												alwaysApplyDefaultBehaviorSettings: e.target.checked,
											});
										}}
										offLabel="OFF"
										onLabel="ON"
										disabled={isLoading || isPending}
									/>
								</FormField>
							)}
						</AutoSaveForFormField>
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getDefaultViewBehaviorOption },
								],
								useMutationArgs: [{ mutationFn: setDefaultViewBehaviorOption }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									isLoading={isPending}
									title={browser.i18n.getMessage(
										"settings_userOption_alwaysDisplayPlayerBar_title",
									)}
									description={browser.i18n.getMessage(
										"settings_userOption_alwaysDisplayPlayerBar_description",
									)}
									formState={data}
								>
									<Switch
										size="lg"
										checked={data.alwaysDisplayPlayerBar}
										onChange={(e) => {
											mutate({ alwaysDisplayPlayerBar: e.target.checked });
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
		"Form:TheaterModeBehavior",
		{
			FormElement: ({ formId }) => {
				const queryKey = [formId];
				return (
					<FormGroup
						title={browser.i18n.getMessage(
							"settings_userOption_theaterModeBehavior_title",
						)}
					>
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getTheaterModeBehaviorOption },
								],
								useMutationArgs: [{ mutationFn: setTheaterModeBehaviorOption }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									title={browser.i18n.getMessage(
										"settings_userOption_positionPlayerBar_title",
									)}
									isLoading={isPending}
									formState={data}
								>
									<SegmentedControl
										data={playerBarPisitonSelect}
										value={data.positionPlayerBar}
										onChange={(e) => {
											mutate({
												positionPlayerBar: e as typeof data.positionPlayerBar,
											});
										}}
										fullWidth
										disabled={isLoading || isPending}
									/>
								</FormField>
							)}
						</AutoSaveForFormField>
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getDefaultViewBehaviorOption },
								],
								useMutationArgs: [{ mutationFn: setDefaultViewBehaviorOption }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									isLoading={isPending}
									title={browser.i18n.getMessage(
										"settings_userOption_alwaysApplyDefaultBehaviorSettings_title",
										browser.i18n.getMessage("metawords_theaterMode"),
									)}
									description={browser.i18n.getMessage(
										"settings_userOption_alwaysApplyDefaultBehaviorSettings_description",
									)}
									formState={data}
								>
									<Switch
										size="lg"
										checked={data.alwaysApplyDefaultBehaviorSettings}
										onChange={(e) => {
											mutate({
												alwaysApplyDefaultBehaviorSettings: e.target.checked,
											});
										}}
										offLabel="OFF"
										onLabel="ON"
										disabled={isLoading || isPending}
									/>
								</FormField>
							)}
						</AutoSaveForFormField>
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getTheaterModeBehaviorOption },
								],
								useMutationArgs: [{ mutationFn: setTheaterModeBehaviorOption }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									isLoading={isPending}
									title={browser.i18n.getMessage(
										"settings_userOption_alwaysDisplayPlayerBar_title",
									)}
									description={browser.i18n.getMessage(
										"settings_userOption_alwaysDisplayPlayerBar_description",
									)}
									formState={data}
								>
									<Switch
										size="lg"
										checked={data.alwaysDisplayPlayerBar}
										onChange={(e) => {
											mutate({ alwaysDisplayPlayerBar: e.target.checked });
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
		"Form:FullscreenBehavior",
		{
			FormElement: ({ formId }) => {
				const queryKey = [formId];
				return (
					<FormGroup
						title={browser.i18n.getMessage(
							"settings_userOption_fullscreenBehavior_title",
						)}
					>
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getFullscreenBehaviorOption },
								],
								useMutationArgs: [{ mutationFn: setFullscreenBehaviorOption }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									title={browser.i18n.getMessage(
										"settings_userOption_positionPlayerBar_title",
									)}
									isLoading={isPending}
									formState={data}
								>
									<SegmentedControl
										data={playerBarPisitonSelect}
										value={data.positionPlayerBar}
										onChange={(e) => {
											mutate({
												positionPlayerBar: e as typeof data.positionPlayerBar,
											});
										}}
										fullWidth
										disabled={isLoading || isPending}
									/>
								</FormField>
							)}
						</AutoSaveForFormField>
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getDefaultViewBehaviorOption },
								],
								useMutationArgs: [{ mutationFn: setDefaultViewBehaviorOption }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									isLoading={isPending}
									title={browser.i18n.getMessage(
										"settings_userOption_alwaysApplyDefaultBehaviorSettings_title",
										browser.i18n.getMessage("metawords_fullscreen"),
									)}
									description={browser.i18n.getMessage(
										"settings_userOption_alwaysApplyDefaultBehaviorSettings_description",
									)}
									formState={data}
								>
									<Switch
										size="lg"
										checked={data.alwaysApplyDefaultBehaviorSettings}
										onChange={(e) => {
											mutate({
												alwaysApplyDefaultBehaviorSettings: e.target.checked,
											});
										}}
										offLabel="OFF"
										onLabel="ON"
										disabled={isLoading || isPending}
									/>
								</FormField>
							)}
						</AutoSaveForFormField>
						<AutoSaveForFormField
							option={{
								useSuspenseQueryArgs: [
									{ queryKey, queryFn: getFullscreenBehaviorOption },
								],
								useMutationArgs: [{ mutationFn: setFullscreenBehaviorOption }],
							}}
						>
							{([{ data, isLoading }, { mutate, isPending }]) => (
								<FormField
									isLoading={isPending}
									title={browser.i18n.getMessage(
										"settings_userOption_alwaysDisplayPlayerBar_title",
									)}
									description={browser.i18n.getMessage(
										"settings_userOption_alwaysDisplayPlayerBar_description",
									)}
									formState={data}
								>
									<Switch
										size="lg"
										checked={data.alwaysDisplayPlayerBar}
										onChange={(e) => {
											mutate({ alwaysDisplayPlayerBar: e.target.checked });
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
