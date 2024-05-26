import { FormGroup } from "@/sharedUI/Components/forms/layouts/FormGroup.js";
import { SwitchDebugModeField } from "./DebugModeOptionField/SwitchDebugModeField.js";
import { SwitchForceDisableField } from "./ForceDisableOptionField/SwitchForceDisableField.js";

export const ExtensionMetaForm = () => {
	return (
		<FormGroup title="">
			<SwitchForceDisableField />
			<SwitchDebugModeField />
		</FormGroup>
	);
};
