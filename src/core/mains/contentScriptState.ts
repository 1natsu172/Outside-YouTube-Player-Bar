import type { ExtensionBehavior } from "./extensionFeatures.js";

type OperationState = {
	videoPlayerMode: "none" | "defaultView" | "theaterMode" | "fullscreen";
	uiMount: "mounted" | "unmounted" | "failed";
	status: "standByVideoPage";
};

/**
 * Represents the current state
 */
export type ContentScriptState = {
	behavior: ExtensionBehavior;
	operation: OperationState;
};
