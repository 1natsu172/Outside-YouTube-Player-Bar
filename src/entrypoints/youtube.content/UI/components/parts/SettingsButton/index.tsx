/// <reference types="vite-plugin-svgr/client" />

import SettingsIcon from "@/public/images/settings.svg?react";
import style from "./style.module.css";
import { useBarPosition } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { useCallback } from "react";

type P = {
	tooltip: string;
};
export const SettingsButton = (props: P) => {
	const { tooltip } = props;
	const barposition = useBarPosition();
	const isOutside = barposition === "outside";

	const openSettings = useCallback(async () => {
		await browser.runtime.sendMessage({ action: "openOptionsPage" });
	}, []);

	return (
		<>
			<SettingsIcon
				className={`${style["settings-button"]} ${
					isOutside && style["settings-button--is-outside"]
				}`}
				onClick={openSettings}
			/>
			<span className={style.tooltip}>{tooltip}</span>
		</>
	);
};
