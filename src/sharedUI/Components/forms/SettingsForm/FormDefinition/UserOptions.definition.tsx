import { videoPlayerModeKeysWithoutNone } from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { ExtensionBehaviorForm } from "./ExtensionBehaviorForm/index.js";
import { UiEnhanceOptionsForm } from "./UiEnhanceOptionsForm/index.js";
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
export const UiEnhanceOptionsFormDefs = new Map([
	[
		"Form:UiEnhanceOptions",
		{
			FormElement: () => {
				return <UiEnhanceOptionsForm />;
			},
		},
	],
]) satisfies FormDefs;
