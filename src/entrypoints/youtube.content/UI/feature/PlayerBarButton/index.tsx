import { ToggleButton } from "../../components/parts/ToggleButton/index.js";
import style from "./style.module.css";
import { useMemo } from "react";
import { useBarPosition } from "@/core/services/behaviorServices/index.service.js";
import { useVideoPlayerMode } from "@/core/services/siteMetaServices/index.js";

export const PlayerBarButton = () => {
	const currentBarPosition = useBarPosition();
	const videoPlayerMode = useVideoPlayerMode();
	const tooltip = useMemo(
		() =>
			currentBarPosition === "outside"
				? browser.i18n.getMessage("tooltipText_toInside")
				: browser.i18n.getMessage("tooltipText_toOutside"),
		[currentBarPosition],
	);

	return (
		<div className={style["player-bar-button"]}>
			<ToggleButton
				currentBarPosition={currentBarPosition}
				videoPlayerMode={videoPlayerMode}
				tooltip={tooltip}
			/>
		</div>
	);
};
