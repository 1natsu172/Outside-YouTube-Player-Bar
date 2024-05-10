import { setPositionPlayerBar } from "@/core/usecases/behaviorState.usecase.js";
import { resolveBehaviorOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import type {
	BehaviorState,
	SiteMetaState,
} from "@/core/mains/contentScriptState.js";

export const changePositionPlayerBarByChangedPlayerMode = async ({
	videoPlayerMode,
}: { videoPlayerMode: SiteMetaState["videoPlayerState"]["mode"] }) => {
	if (videoPlayerMode === "none") {
		return;
	}

	const userOption = await resolveBehaviorOption(videoPlayerMode);
	if (userOption.alwaysApplyDefaultBehaviorSettings) {
		setPositionPlayerBar(userOption.positionPlayerBar);
		logger.debug(
			"position player bar change to",
			userOption.positionPlayerBar,
			"(by user setting value)",
		);
	}
};

export const changePositionPlayerBar = async ({
	to,
}: { to: BehaviorState["positionPlayerBar"] }) => {
	logger.debug("position player bar change to", to);
	setPositionPlayerBar(to);
};
