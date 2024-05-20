import type { VideoPlayerMode } from "@/core/mains/contentScriptState.js";

export type ExtensionBehavior = {
	positionPlayerBar: "inside" | "outside";
	alwaysDisplayPlayerBar: boolean;
	inheritPositionPlayerBarBeforeSwitching: Exclude<VideoPlayerMode, "none">[];
};
