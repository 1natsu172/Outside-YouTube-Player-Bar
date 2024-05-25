import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";

export type ExtensionBehavior = {
	positionPlayerBar: "inside" | "outside";
	alwaysDisplayPlayerBar: boolean;
	inheritPositionPlayerBarBeforeSwitching: VideoPlayerModeWithoutNone[];
};
