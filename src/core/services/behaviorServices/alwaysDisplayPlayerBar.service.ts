import { elementAttributes } from "@/core/mains/meta.js";
import { getBehaviorState } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { getUiOps } from "@/core/presenters/statePresenter/operationState/index.js";
import { getSiteMetaState } from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { resolveBehaviorOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import { documentElementAttr } from "@/core/services/domAffectServices/domMetaAffect.service.js";

// TODO: テスト書く
export function judgeMoviePlayerCondition(moviePlayer: Element) {
	const isPlayingMode = moviePlayer.classList.contains("playing-mode");
	const isPausedMode = moviePlayer.classList.contains("paused-mode");
	const isAutoHide = moviePlayer.classList.contains("ytp-autohide");

	const isVisiblePlayerBar = isPausedMode || !isAutoHide;

	return {
		isPlayingMode,
		isPausedMode,
		isVisiblePlayerBar,
	};
}

/**
 * @description NOTE: https://github.com/1natsu172/Outside-YouTube-Player-Bar/issues/84
 */
export const createPlayerHackEventFn = (moviePlayer: Element) => {
	// const mousedown = (mouseEventInit?:MouseEventInit) => moviePlayer.dispatchEvent(new MouseEvent("mousedown",mouseEventInit));
	const mouseover = (mouseEventInit?: MouseEventInit) =>
		moviePlayer.dispatchEvent(new MouseEvent("mouseover", mouseEventInit));
	const mousemove = (mouseEventInit?: MouseEventInit) =>
		moviePlayer.dispatchEvent(new MouseEvent("mousemove", mouseEventInit));
	const mouseleave = (mouseEventInit?: MouseEventInit) =>
		moviePlayer.dispatchEvent(new MouseEvent("mouseleave", mouseEventInit));

	function activateBlockAutoHide() {
		disableAutoHide();
	}
	function deactivateBlockAutoHide() {
		enableAutoHide();
	}

	function disableAutoHide() {
		mouseover({ clientX: 1, clientY: 1 });
		mousemove({ clientX: 2, clientY: 2 });
		logger.debug("disableAutoHide function fired.");
	}

	function enableAutoHide() {
		mouseleave();
		logger.debug("enableAutoHide function fired.");
	}

	return { activateBlockAutoHide, deactivateBlockAutoHide };
};

export const execAlwaysDisplayPlayerBar = async ({
	isVisiblePlayerBar,
	blockAutoHide,
}: {
	isVisiblePlayerBar: boolean;
	blockAutoHide: () => void;
}) => {
	const dataAttrIsAlwaysDisplayBar = documentElementAttr(
		elementAttributes.oypb.IS_ALWAYS_DISPLAY_PLAYER_BAR,
	);

	const { positionPlayerBar } = getBehaviorState();
	const { moviePlayerContext } = getUiOps();

	const {
		videoPlayerState: { mode },
	} = getSiteMetaState();

	if (mode === "none") {
		return;
	}

	const { alwaysDisplayPlayerBar } = await resolveBehaviorOption(mode);

	const isOutside = positionPlayerBar === "outside";

	logger.debug("execAlwaysDisplayPlayerBar", [
		[
			"isExec =>",
			isOutside && alwaysDisplayPlayerBar && !isVisiblePlayerBar,
			[isOutside, alwaysDisplayPlayerBar, !isVisiblePlayerBar],
		],
		{ isOutside, alwaysDisplayPlayerBar, isVisiblePlayerBar },
	]);

	// NOTE: For "alwaysDisplayPlayerBar" option user scope
	if (isOutside && alwaysDisplayPlayerBar && !isVisiblePlayerBar) {
		blockAutoHide();
		dataAttrIsAlwaysDisplayBar.set();
	}

	// NOTE: For "is not alwaysDisplayPlayerBar" option user scope
	if (isOutside && !alwaysDisplayPlayerBar) {
		// NOTE: `isVisiblePlayer === true` OR mouseLeaveHackedContext, should show player bar.
		if (isVisiblePlayerBar || moviePlayerContext.hoveringMouse) {
			blockAutoHide();
			dataAttrIsAlwaysDisplayBar.set();
		} else {
			// NOTE: This is effectively the `hide()` method.
			dataAttrIsAlwaysDisplayBar.remove();
		}
	}
};
