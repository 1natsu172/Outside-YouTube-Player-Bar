import { ToggleButton } from "../../components/parts/ToggleButton/index.js";
import { ForceDisablingButton } from "../../components/parts/ForceDisablingButton/index.js";
import style from "./style.module.css";
import { useCallback, useMemo } from "react";
import { useBarPosition } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { useVideoPlayerMode } from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { changePositionPlayerBar } from "@/core/services/behaviorServices/positionPlayerBar.service.js";
import type { BehaviorState } from "@/core/mains/contentScriptState.js";
import { SettingsButton } from "../../components/parts/SettingsButton/index.js";
import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { showOpenSettingsIconOption } from "@/core/repositories/options.repository.js";
import { LoadingSpinner } from "@/sharedUI/Components/parts/LoadingSpinner/index.js";
import { useSuspenseQuery } from "@tanstack/react-query";
import { sendMessage } from "@/core/mains/messagings/uiSignals/index.js";
import { checkAboutForceDisable } from "@/core/services/optionsServices/forceDisable.service.js";
import { PlayerBarButtonWrapper } from "./wrapper.js";

type BarPosition = BehaviorState["positionPlayerBar"];

const PlayerBarButtonContainer = () => {
	//// hooks
	const currentBarPosition = useBarPosition();
	const videoPlayerMode = useVideoPlayerMode();
	const {
		store: isShowOpenSettingsIcon,
		isLoading,
		error,
	} = useStorage(showOpenSettingsIconOption);
	const { data: aboutForceDisable } = useSuspenseQuery({
		queryKey: [checkAboutForceDisable.name],
		queryFn: checkAboutForceDisable,
	});

	//// tooltip
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
	const forceDisablingTooltip = useMemo(
		() =>
			aboutForceDisable.isDisabling &&
			aboutForceDisable.canDeactivateForceDisable
				? browser.i18n.getMessage(
						"settings_metaOption_forceDisable_availableDeactivate_short",
					)
				: browser.i18n.getMessage(
						"settings_metaOption_forceDisable_activatedNow",
					),
		[aboutForceDisable],
	);

	//// handlers
	const openSettings = useCallback(async () => {
		await sendMessage("openOptionsPage", undefined);
	}, []);
	const onToggle = useCallback(() => {
		const to: BarPosition =
			currentBarPosition === "inside" ? "outside" : "inside";
		changePositionPlayerBar({ to });
	}, [currentBarPosition]);

	//// return components
	if (isLoading) {
		return <LoadingSpinner />;
	}
	if (aboutForceDisable.isDisabling) {
		return (
			<ForceDisablingButton
				tooltip={forceDisablingTooltip}
				openSettings={openSettings}
			/>
		);
	}
	return (
		<>
			<ToggleButton
				onToggle={onToggle}
				currentBarPosition={currentBarPosition}
				videoPlayerMode={videoPlayerMode}
				tooltip={toggleTooltip}
			/>
			{isShowOpenSettingsIcon && (
				<SettingsButton
					tooltip={openSettingsTooltip}
					openSettings={openSettings}
				/>
			)}
		</>
	);
};

export const PlayerBarButton = () => {
	return (
		<PlayerBarButtonWrapper>
			<PlayerBarButtonContainer />
		</PlayerBarButtonWrapper>
	);
};
