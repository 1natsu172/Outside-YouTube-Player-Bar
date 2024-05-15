import { FormGroup } from "../FormGroup.js";
import { SwitchDebugModeField } from "./DebugModeOptionField/SwitchDebugModeField.js";
import { DeactivateAvailableField } from "./ForceDisableOptionField/DeactivateAvailableField.js";
import { SwitchForceDisableField } from "./ForceDisableOptionField/SwitchForceDisableField.js";
import type { FormDefs } from "./formDefinition.types.js";

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
						<SwitchForceDisableField queryKey={queryKey} />
						<DeactivateAvailableField queryKey={queryKey} />
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
						<SwitchDebugModeField queryKey={queryKey} />
					</FormGroup>
				);
			},
		},
	],
]);
