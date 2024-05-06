import { Panel } from "primereact/panel";
import { SettingsForm } from "../../forms/SettingsForm/index.js";

export const SettingsPanel = () => {
	return (
		<Panel header="Extension settings">
			<SettingsForm />
		</Panel>
	);
};
