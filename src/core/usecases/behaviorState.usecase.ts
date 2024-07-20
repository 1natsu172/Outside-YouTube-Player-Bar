import type { BehaviorState } from "@/core/mains/contentScriptState.js";
import { behaviorState } from "@/core/repositories/contentScript.repository.js";

export const setPositionPlayerBar = (
	to: BehaviorState["positionPlayerBar"],
) => {
	behaviorState.positionPlayerBar = to;
};
