import type {
	BehaviorState,
	VideoPlayerMode,
} from "@/core/mains/contentScriptState.js";
import { getBehaviorState } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { getFlagOps } from "@/core/presenters/statePresenter/operationState/index.js";
import {
	resolveBehaviorOption,
	resolveInheritPositionPlayerBar,
} from "@/core/presenters/storagePresenter/options.presenter.js";
import { setPositionPlayerBar } from "@/core/usecases/behaviorState.usecase.js";
import { setDoneIntialMovePlayerBar } from "@/core/usecases/operationState.usecase.js";

/**
 * @todo: テスト書く
 */
export const changePositionPlayerBarByChangedPlayerMode = async ({
	videoPlayerMode,
}: {
	videoPlayerMode: {
		prev: VideoPlayerMode;
		curr: VideoPlayerMode;
	};
}) => {
	if (videoPlayerMode.curr === "none") {
		return;
	}

	const userOption = await resolveBehaviorOption(videoPlayerMode.curr);
	const { doneIntialMovePlayerBar } = getFlagOps();
	// First time that try move player bar (use default option setting)
	if (!doneIntialMovePlayerBar) {
		setPositionPlayerBar(userOption.positionPlayerBar);
		setDoneIntialMovePlayerBar(true);
		logger.debug(
			"tried position player bar change at the first time",
			userOption.positionPlayerBar,
		);
	}
	// After the second time, move player bar if the user always want to apply it.
	if (doneIntialMovePlayerBar) {
		const shouldInheritPositionPlayerBar = resolveInheritPositionPlayerBar({
			inheritPositionSetting:
				userOption.inheritPositionPlayerBarBeforeSwitching,
			fromPosition: videoPlayerMode.prev,
		});
		// inherit previous bar position of video mode (do not use default option setting)
		if (shouldInheritPositionPlayerBar) {
			const { positionPlayerBar } = getBehaviorState();
			setPositionPlayerBar(positionPlayerBar);
			logger.debug(
				"position player bar change to",
				positionPlayerBar,
				"(inherit position before switching)",
			);
		}
		// always use default option setting
		else {
			setPositionPlayerBar(userOption.positionPlayerBar);
			logger.debug(
				"position player bar change to",
				userOption.positionPlayerBar,
				"(by user setting value)",
			);
		}
	}
};

export const changePositionPlayerBar = async ({
	to,
}: { to: BehaviorState["positionPlayerBar"] }) => {
	logger.debug("position player bar change to", to);
	setPositionPlayerBar(to);
};
