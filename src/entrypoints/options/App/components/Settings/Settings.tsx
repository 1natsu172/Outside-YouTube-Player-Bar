import style from "./Settings.module.css";
import { SettingsPanel } from "@/sharedUI/Components/panels/SettingsPanel/index.js";

export const Settings = () => {
	return (
		<div className={style["settings-container"]}>
			<SettingsPanel />
		</div>
	);
};
