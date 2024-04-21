import { currentBehaviorState } from "@/core/repositories/contentScript.repository.js";
import type { ContentScriptState } from "@/core/mains/contentScriptState.js";

export const setPositionPlayerBar = (
	to: ContentScriptState["currentBehavior"]["positionPlayerBar"],
) => {
	currentBehaviorState.positionPlayerBar = to;
};

export const setAlwaysDisplayPlayerBar = (
	is: ContentScriptState["currentBehavior"]["alwaysDisplayPlayerBar"],
) => {
	currentBehaviorState.alwaysDisplayPlayerBar = is;
};
