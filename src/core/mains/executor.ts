// Memo だいたいここでservice処理全般を実行する
import { subscribeKey, watch } from "valtio/utils";
import {
	operationState,
	currentBehaviorState,
} from "@/core/repositories/contentScript.repository.js";

export class Executor {
	watch() {
		watch((get) => {
			const isDoneInit = get(operationState).doneInitialize;
			logger.log(isDoneInit);
		});
	}

	async initialization() {
		// todo
		if (operationState.doneInitialize) {
			logger.warn("oops, initialize seems to have been called multiple times!");
			return;
		}
		logger.log("execute initialization.");
		this.watch();
	}
}
