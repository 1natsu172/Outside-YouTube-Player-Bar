import { Panel } from "primereact/panel";
import { InputSwitch } from "primereact/inputswitch";

export const SettingsPanel = () => {
	return (
		<Panel header="Extension settings">
			<InputSwitch checked={true} />
		</Panel>
	);
};
