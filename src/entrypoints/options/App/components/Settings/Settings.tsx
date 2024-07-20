import { SettingsPanel } from "@/sharedUI/Components/panels/SettingsPanel/index.js";
import { Container, Paper } from "@mantine/core";
import style from "./Settings.module.css";

export const Settings = () => {
	return (
		<Paper className={style.wrapper}>
			<Container size={"xl"}>
				<SettingsPanel />
			</Container>
		</Paper>
	);
};
