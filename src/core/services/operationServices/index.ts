import { getBehaviorState } from "@/core/presenters/statePresenter/behaviorState/index.js";
import { getUiOps } from "@/core/presenters/statePresenter/operationState/index.js";
import {
	setDoneInitialize,
	setMoviePlayerContext,
	setOypbEnable,
	setPlayerBarIntersection,
} from "@/core/usecases/operationState.usecase.js";
import { changePositionPlayerBar } from "../behaviorServices/positionPlayerBar.service.js";

export const doneInitializeOperation = () => {
	setDoneInitialize(true);
};

export const oypbEnableOperation = (is: boolean) => {
	setOypbEnable(is);
};

export const playerBarIntersectionOperation = ({
	intersect,
}: {
	intersect: "appeared" | "disappeared" | "littleAppeared";
}) => {
	const barPosition = getBehaviorState().positionPlayerBar;
	const { shouldRestoreToOutside } = getUiOps().playerBarIntersection;
	if (intersect === "disappeared") {
		if (barPosition === "outside") {
			setPlayerBarIntersection({
				shouldRestoreToOutside: true,
				shouldHidePlayerBarButton: true,
			});
			changePositionPlayerBar({ to: "inside" });
		}
	}
	if (intersect === "littleAppeared") {
		if (barPosition === "inside") {
			if (shouldRestoreToOutside === true) {
				setPlayerBarIntersection({
					shouldRestoreToOutside: false,
					shouldHidePlayerBarButton: false,
				});
				changePositionPlayerBar({ to: "outside" });
			}
		}
	}
};

export const moviePlayerHoveringOperation = (is: boolean) => {
	const current = getUiOps().moviePlayerContext;
	const state = { ...current, hoveringMouse: is };
	setMoviePlayerContext(state);
	logger.debug("moviePlayer hovering operation changed", state);
};
