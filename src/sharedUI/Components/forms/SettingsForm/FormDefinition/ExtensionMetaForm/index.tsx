import { FormFieldsSection } from "../../../layouts/FormSection.js";
import { SwitchDebugModeField } from "./DebugModeOptionField/SwitchDebugModeField.js";
import { SwitchForceDisableField } from "./ForceDisableOptionField/SwitchForceDisableField.js";

export const ExtensionMetaForm = () => {
	return (
		<FormFieldsSection title="">
			<SwitchForceDisableField />
			<SwitchDebugModeField />
		</FormFieldsSection>
	);
};
