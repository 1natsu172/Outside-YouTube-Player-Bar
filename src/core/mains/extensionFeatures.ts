import type { VideoPlayerMode } from "@/core/mains/contentScriptState.js";

export type ExtensionBehavior = {
	positionPlayerBar: "inside" | "outside";
	alwaysDisplayPlayerBar: boolean;
	/**
	 * FIXME: fullscreen(内側)→theater(引継ぐ)にしていると必ず引き継いでしまうが、都合が悪い。
	 * default ← theater ✓
	 * default ← fullscreen
	 * theater ← default ✓
	 * theater ← fullscreen
	 * のようにセレクトボックス型にするべき
	 */
	inheritPositionPlayerBarBeforeSwitching: Exclude<VideoPlayerMode, "none">[];
};
