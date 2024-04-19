import { behaviorState } from "@/core/repositories/contentScript.repository.js";
import type { ContentScriptState } from "@/core/mains/contentScriptState.js";

export const setPositionPlayerBar = (
	to: ContentScriptState["behavior"]["positionPlayerBar"],
) => {
	behaviorState.positionPlayerBar = to;
};

export const setAlwaysDisplayPlayerBar = (
	is: ContentScriptState["behavior"]["alwaysDisplayPlayerBar"],
) => {
	behaviorState.alwaysDisplayPlayerBar = is;
};
