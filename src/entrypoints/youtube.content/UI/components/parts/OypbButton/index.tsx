/// <reference types="vite-plugin-svgr/client" />

import { useBarPosition } from "@/core/services/behaviorServices/index.service.js";
import ToggleIcon from "@/public/images/oypb-toggle.svg?react";
import { useMemo } from "react";
import style from "./style.module.css";

export const OypbButton = () => {
	const currentBarPosition = useBarPosition();
	const tooltipText = useMemo(
		() =>
			currentBarPosition === "outside"
				? browser.i18n.getMessage("tooltipText_toInside")
				: browser.i18n.getMessage("tooltipText_toOutside"),
		[currentBarPosition],
	);

	return (
		<div className={style.buttonWrapper}>
			<button
				type="button"
				id="oypb-toggleExtension"
				className={`ytp-button ${style.button}`}
			>
				<ToggleIcon />
			</button>
			<span className={style.tooltip}>{tooltipText}</span>
		</div>
	);
};
