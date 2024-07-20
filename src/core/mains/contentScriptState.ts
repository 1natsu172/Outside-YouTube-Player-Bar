import type { proxyWithHistory } from "valtio-history";
import type { ExtensionBehavior } from "./extensionFeatures.js";

export type ReflectFunctionalityState = Readonly<{
	feature: {
		behavior: BehaviorState;
	};
	context: {
		videoPlayerState: SiteMetaState["videoPlayerState"];
	};
}>;

/**
 * NOTE: The value of the option is not held here because it would be a double state management. This state is an object representing the current behavior of the extension, excluding side effects.
 */
export type BehaviorState = Pick<ExtensionBehavior, "positionPlayerBar">;

export type SiteMetaState = {
	// TODO(future): Generics by specific sites (e.g.: <VPM extends string> )
	videoPlayerState: {
		mode: "none" | "defaultView" | "theaterMode" | "fullscreen";
	};
	appearanceState: {
		colorTheme?: "light" | "dark";
	};
	infoState: { version: string | null };
	navigationState: ReturnType<
		typeof proxyWithHistory<
			Pick<Location, "href" | "origin" | "pathname" | "search">
		>
	>;
};

export type OperationState = {
	uiOps: {
		mount: "mounted" | "unmount" | "failed";
		playerBarIntersection: {
			shouldRestoreToOutside: boolean;
			shouldHidePlayerBarButton: boolean;
		};
		moviePlayerContext: {
			hoveringMouse: boolean;
		};
	};
	processOps: {
		// TODO: 本当にいる？
		scriptStatus: "standByVideoPage" | "pageNavigated";
	};
	flagOps: {
		doneInitialize: boolean;
		oypbEnable: boolean | undefined;
		doneIntialMovePlayerBar: boolean;
	};
};

/**
 * Represents the current state.
 * @implements @/core/repositories/contentScript.repository
 */
export type ContentScriptState = {
	/**
	 * This is "Current" state. Not globally behavior state(user-option storage content).
	 * If the user changes the user-option, this state should be sync to that state.
	 */
	behavior: BehaviorState;
	// TODO: storageの状態をcontent-script内にreactiveに持ち込む必要がどうしても出たらUserOptionをメモリストア上に同期させる必要がある 普通はstorageにgetValueすればいいはずだが…。
	// userOptions: UserOptions;
	operation: OperationState;
	siteMeta: SiteMetaState;

	/**
	 * A special ProxyState to pump context and functionality from each state and actually reflect it in the UI.
	 */
	__reflectFunctionality__: ReflectFunctionalityState;
};

export type VideoPlayerMode = SiteMetaState["videoPlayerState"]["mode"];
export type VideoPlayerModeWithoutNone = Exclude<
	SiteMetaState["videoPlayerState"]["mode"],
	"none"
>;
