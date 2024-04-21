// TODO: だいたいここでservice処理全般を実行する
import { subscribeKey, watch } from "valtio/utils";
import {
	operationState,
	currentBehaviorState,
} from "@/core/repositories/contentScript.repository.js";
import { setupEventEffects } from "@/core/services/eventEffectServices/eventEffects.service.js";

export class Executor {
	watch() {
		watch((get) => {
			const isDoneInit = get(operationState).doneInitialize;
			logger.debug("called executor's watch", {
				isDoneInit,
			});
		});
	}

	async initialization() {
		// todo
		if (operationState.doneInitialize) {
			logger.warn("oops, initialize seems to have been called multiple times!");
			return;
		}
		logger.debug("execute initialization.");
		this.watch();
		await this.registerEffects();
	}

	async registerEffects() {
		return setupEventEffects();
	}
}
