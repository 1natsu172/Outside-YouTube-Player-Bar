/// <reference types="vite-plugin-svgr/client" />

import SettingsIcon from "@/public/images/settings.svg?react";
import style from "./style.module.css";
import { useContext } from "react";
import { ModalHandlerContext } from "@/sharedUI/Provider/ModalProvider/index.js";
import { useBarPosition } from "@/core/presenters/statePresenter/behaviorState/index.js";

type P = {
	tooltip: string;
};
export const SettingsButton = (props: P) => {
	const { tooltip } = props;
	const { onOpen: openSettings } = useContext(ModalHandlerContext);
	const barposition = useBarPosition();
	const isOutside = barposition === "outside";

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
