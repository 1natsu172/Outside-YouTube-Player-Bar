import { SettingsPanel } from "@/sharedUI/Components/panels/SettingsPanel/index.js";
import { Container } from "@mantine/core";
import style from "./Settings.module.css";

export const Settings = () => {
	return (
		<Container className={style["settings-container"]} fluid size={"xs"}>
			<SettingsPanel />
		</Container>
	);
};
