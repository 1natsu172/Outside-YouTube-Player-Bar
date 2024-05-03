import { ToggleButton } from "../../components/parts/ToggleButton/index.js";
import style from "./style.module.css";
import { useCallback, useMemo } from "react";
import { useBarPosition } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { useVideoPlayerMode } from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { changePositionPlayerBar } from "@/core/services/behaviorServices/positionPlayerBar.service.js";
import type { BehaviorState } from "@/core/mains/contentScriptState.js";
import { SettingsButton } from "../../components/parts/SettingsButton/index.js";
import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { showOpenSettingsIconOption } from "@/core/repositories/options.repository.js";

import { ProgressSpinner } from "primereact/progressspinner";

type BarPosition = BehaviorState["positionPlayerBar"];

export const PlayerBarButton = () => {
	const currentBarPosition = useBarPosition();
	const videoPlayerMode = useVideoPlayerMode();
	const {
		store: isShowOpenSettingsIcon,
		isLoading,
		error,
	} = useStorage(showOpenSettingsIconOption);

	const toggleTooltip = useMemo(
		() =>
			currentBarPosition === "outside"
				? browser.i18n.getMessage("tooltipText_toInside")
				: browser.i18n.getMessage("tooltipText_toOutside"),
		[currentBarPosition],
	);

	const openSettingsTooltip = useMemo(
		() => browser.i18n.getMessage("tooltipText_openSettings"),
		[],
	);

	const onToggle = useCallback(() => {
		const to: BarPosition =
			currentBarPosition === "inside" ? "outside" : "inside";
		changePositionPlayerBar({ to });
	}, [currentBarPosition]);

	if (isLoading) {
		return (
			<ProgressSpinner
				strokeWidth="8"
				fill="var(--surface-ground)"
				animationDuration=".5s"
			/>
		);
	}
	return (
		<div className={style["player-bar-button"]}>
			<ToggleButton
				onToggle={onToggle}
				currentBarPosition={currentBarPosition}
				videoPlayerMode={videoPlayerMode}
				tooltip={toggleTooltip}
			/>
			{isShowOpenSettingsIcon && (
				<SettingsButton tooltip={openSettingsTooltip} />
			)}
		</div>
	);
};
