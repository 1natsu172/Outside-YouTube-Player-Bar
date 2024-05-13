import { SettingsPanel } from "@/sharedUI/Components/panels/SettingsPanel/index.js";
import style from "./Settings.module.css";

export const Settings = () => {
	return (
		<div className={style["settings-container"]}>
			<SettingsPanel />
		</div>
	);
};
