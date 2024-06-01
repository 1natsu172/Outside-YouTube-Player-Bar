import type { BehaviorState } from "@/core/mains/contentScriptState.js";
import { sendMessage } from "@/core/mains/messagings/uiSignals/index.js";
import { useBarPosition } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { usePlayerBarIntersectionInfo } from "@/core/presenters/statePresenter/operationState/index.js";
import { useVideoPlayerMode } from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { showOpenSettingsIconOption } from "@/core/repositories/options.repository.js";
import { changePositionPlayerBar } from "@/core/services/behaviorServices/positionPlayerBar.service.js";
import { checkAboutForceDisable } from "@/core/services/optionsServices/forceDisable.service.js";
import { LoadingSpinner } from "@/sharedUI/Components/parts/LoadingSpinner/index.js";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { ForceDisablingButton } from "../../components/parts/ForceDisablingButton/index.js";
import { SettingsButton } from "../../components/parts/SettingsButton/index.js";
import { ToggleButton } from "../../components/parts/ToggleButton/index.js";
import { PlayerBarButtonWrapper } from "./wrapper.js";

type BarPosition = BehaviorState["positionPlayerBar"];

const PlayerBarButtonContainer = () => {
	//// hooks
	const currentBarPosition = useBarPosition();
	const videoPlayerMode = useVideoPlayerMode();
	const { shouldHidePlayerBarButton } = usePlayerBarIntersectionInfo();
	const { store: isShowOpenSettingsIcon, isLoading } = useStorage(
		showOpenSettingsIconOption,
	);
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
			aboutForceDisable.isShowUpdateRed
				? browser.i18n.getMessage(
						"settings_metaOption_forceDisable_availableDeactivate_short",
					)
				: browser.i18n.getMessage(
						"settings_metaOption_forceDisable_activatedNow_short",
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
	if (shouldHidePlayerBarButton) {
		return null;
	}
	if (isLoading) {
		return <LoadingSpinner />;
	}
	if (aboutForceDisable.isDisabling) {
		return (
			<ForceDisablingButton
				tooltip={forceDisablingTooltip}
				openSettings={openSettings}
				showUpdateRed={aboutForceDisable.isShowUpdateRed}
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
				showUpdateRed={aboutForceDisable.isShowUpdateRed}
			/>
			{isShowOpenSettingsIcon && (
				<SettingsButton
					tooltip={openSettingsTooltip}
					openSettings={openSettings}
					videoPlayerMode={videoPlayerMode}
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
