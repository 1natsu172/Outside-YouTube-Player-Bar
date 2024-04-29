import { ToggleButton } from "../../components/parts/ToggleButton/index.js";
import style from "./style.module.css";
import { useCallback, useMemo } from "react";
import { useBarPosition } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { useVideoPlayerMode } from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { changePositionPlayerBar } from "@/core/services/behaviorServices/positionPlayerBar.service.js";
import type { BehaviorState } from "@/core/mains/contentScriptState.js";

type BarPosition = BehaviorState["positionPlayerBar"];

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
	const onToggle = useCallback(() => {
		const to: BarPosition =
			currentBarPosition === "inside" ? "outside" : "inside";
		changePositionPlayerBar({ to });
	}, [currentBarPosition]);

	return (
		<div className={style["player-bar-button"]}>
			<ToggleButton
				onToggle={onToggle}
				currentBarPosition={currentBarPosition}
				videoPlayerMode={videoPlayerMode}
				tooltip={tooltip}
			/>
		</div>
	);
};
