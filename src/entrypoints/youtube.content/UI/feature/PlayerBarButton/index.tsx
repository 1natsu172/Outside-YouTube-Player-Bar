import { ToggleButton } from "../../components/parts/ToggleButton/index.js";
import style from "./style.module.css";
import { useMemo } from "react";
import { useBarPosition } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { useVideoPlayerMode } from "@/core/presenters/statePresenter/siteMetaState/index.js";

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
