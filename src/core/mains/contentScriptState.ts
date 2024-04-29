import type { ExtensionBehavior } from "./extensionFeatures.js";
import type { proxyWithHistory } from "valtio-history";

export type ReflectFunctionalityState = Readonly<{
	feature: {
		behavior: BehaviorState;
	};
	context: {
		videoPlayerState: SiteMetaState["videoPlayerState"];
	};
}>;

export type BehaviorState = ExtensionBehavior;

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
	};
	processOps: {
		scriptStatus: "standByVideoPage";
	};
	flagOps: {
		doneInitialize: boolean;
		oypbEnable: boolean | undefined;
	};
	// TODO: operationのmutexをするあるいはOperationのコレクションを抱えて逐次処理するための箱が必要になるかもしれない・あとで決める
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
	behavior: BehaviorState;
	// TODO: storageの状態をcontent-script内にreactiveに持ち込む必要がどうしても出たらUserOptionをメモリストア上に同期させる必要がある 普通はstorageにgetValueすればいいはずだが…。
	// userOptions: UserOptions;
	operation: OperationState;
	siteMeta: SiteMetaState;

	__reflectFunctionality__: ReflectFunctionalityState;
};
