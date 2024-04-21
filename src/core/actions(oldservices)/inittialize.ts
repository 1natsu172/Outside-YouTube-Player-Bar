import { extensionSwitcher } from "../controllers(deprecated)/extensionSwicher.js";
import { isVideoPage } from "../presenters/judgePage.js";
import {
	hasInjected,
	isAlwaysDisplayPlayerBar,
} from "../repositories/extensionState.js";
import {
	// setHasInjected,
	// setIsAlwaysDisplayPlayerBar,
} from "../usecases/behavior.usecase.js";

export function initialize() {
	console.log("EXTENSION INITIALIZING...");
	// setHasInjected(false); // set init state
	// setIsAlwaysDisplayPlayerBar(true); // NOTE: とりあえずオプション提供しないのでここてコンテキスト決め打ちする
	console.log("Init: hasInject?", hasInjected());
	console.log("Init: isAlwaysDisplayPlayerBar?", isAlwaysDisplayPlayerBar());

	// NOTE: URL直打ちあるいは新規タブで動画ページを開いたかを判定する
	const isInitializeOnVideoPage = isVideoPage();
	return { isInitializeOnVideoPage };
}

export function additionalInitializationOnVideoPage() {
	console.log("EXTENSION ADDITIONAL INITIALIZATION ON VIDEO PAGE");
	extensionSwitcher.active();
}
