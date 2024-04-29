import { behaviorState } from "@/core/repositories/contentScript.repository.js";
import type { BehaviorState } from "@/core/mains/contentScriptState.js";

export const setPositionPlayerBar = (
	to: BehaviorState["positionPlayerBar"],
) => {
	behaviorState.positionPlayerBar = to;
};

export const setAlwaysDisplayPlayerBar = (
	is: BehaviorState["alwaysDisplayPlayerBar"],
) => {
	behaviorState.alwaysDisplayPlayerBar = is;
};
