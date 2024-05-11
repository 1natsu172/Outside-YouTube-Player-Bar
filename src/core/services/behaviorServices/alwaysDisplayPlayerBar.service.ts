import { elementAttributes } from "@/core/mains/meta.js";
import { getBehaviorState } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { getSiteMetaState } from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { resolveBehaviorOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import { documentElementAttr } from "@/core/services/domAffectServices/domMetaAffect.service.js";

export const createBlockAutohideFn = (moviePlayer: Element) => {
	const mousedownEvent = new Event("mousedown");
	// const mousemoveEvent = new Event("mousemove");
	// const mouseoverEvent = new Event("mouseover");
	const mouseleaveEvent = new Event("mouseleave");

	const mousedown = () => moviePlayer.dispatchEvent(mousedownEvent);
	// const mousemove = () => moviePlayer.dispatchEvent(mousemoveEvent);
	// const mouseover = () => moviePlayer.dispatchEvent(mouseoverEvent);
	const mouseleave = () => moviePlayer.dispatchEvent(mouseleaveEvent);

	/**
	 * NOTE: ytp-autohideの解除がなぜかこのEvent操作でできる
	 */
	const blockAutohide = () => {
		mousedown();
		mouseleave();
		logger.debug("blockAutoHide function fired.");
	};

	return blockAutohide;
};

export const execAlwaysDisplayPlayerBar = async ({
	isVisiblePlayerBar,
	blockAutoHide,
}: {
	isVisiblePlayerBar: boolean;
	blockAutoHide: () => void;
}) => {
	const execElementAttr = documentElementAttr(
		elementAttributes.oypb.IS_ALWAYS_DISPLAY_PLAYER_BAR,
	);

	const { positionPlayerBar } = getBehaviorState();

	const {
		videoPlayerState: { mode },
	} = getSiteMetaState();

	if (mode === "none") {
		return;
	}

	const { alwaysDisplayPlayerBar } = await resolveBehaviorOption(mode);

	const isOutside = positionPlayerBar === "outside";

	logger.debug("execAlwaysDisplayPlayerBar", [
		["isExec =>", isOutside && alwaysDisplayPlayerBar && !isVisiblePlayerBar],
		[isOutside, alwaysDisplayPlayerBar, !isVisiblePlayerBar],
	]);

	// NOTE: For "alwaysDisplayPlayerBar" option user scope
	if (isOutside && alwaysDisplayPlayerBar && !isVisiblePlayerBar) {
		blockAutoHide();
		execElementAttr.set();
	}

	// NOTE: For "is not alwaysDisplayPlayerBar" option user scope
	if (isOutside && !alwaysDisplayPlayerBar) {
		// NOTE: `isVisiblePlayer === true` equal should show player bar.
		// So it doesn't call blockAutoHide, but only wakes up the data attribute.
		if (isVisiblePlayerBar) {
			execElementAttr.set();
		} else {
			execElementAttr.remove();
		}
	}
};
