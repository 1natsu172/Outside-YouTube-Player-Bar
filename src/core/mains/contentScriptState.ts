import type { ExtensionBehavior } from "./extensionFeatures.js";

type SiteMetaState = {
	// TODO(future): Generics by specific sites (e.g.: <VPM extends string> )
	videoPlayerMode: "none" | "defaultView" | "theaterMode" | "fullscreen";
	colorTheme?: "light" | "dark";
	siteVersion?: "";
};

type OperationState = {
	uiMount: "mounted" | "unmounted" | "failed";
	scriptStatus: "standByVideoPage";
	doneInitialize: boolean;
	// TODO: operarioのmutexをするあるいはOperationのコレクションを抱えて逐次処理するための箱が必要になるかもしれない・あとで決める
};

/**
 * Represents the current state.
 * @implements @/core/repositories/contentScript.repository
 */
export type ContentScriptState = {
	/**
	 * This is "Current" state. Not globally behavior state(user-option storage content).
	 * If the user changes the user-option, this state should be sync to that state.
	 * @todo
	 * When the player mode changes, user can set the option to force the behavior of the default option.
	 */
	currentBehavior: ExtensionBehavior;
	// TODO: storageの状態をcontent-script内にreactiveに持ち込む必要がどうしても出たらUserOptionをメモリストア上に同期させる必要がある 普通はstorageにgetValueすればいいはずだが…。
	// userOptions: UserOptions;
	operation: OperationState;
	siteMeta: SiteMetaState;
};
