// TODO: だいたいここでservice処理全般を実行する
import { subscribeKey, watch } from "valtio/utils";
import {
	operationState,
	currentBehaviorState,
} from "@/core/repositories/contentScript.repository.js";
import { setupEventEffects } from "@/core/services/eventEffectServices/eventEffects.service.js";
import { applyCompatibilityStyles } from "@/core/services/styleAffectServices/applyCompatibilityStyles.service.js";
import { setupElementEffects } from "@/core/services/elementEffectServices/elementEffects.service.js";
import type { EventEffect } from "../services/eventEffectServices/libs/eventEffect.js";

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

		logger.debug("initialization executing.");
		this.watch();
		await this.setupEffects();
		await applyCompatibilityStyles();
		logger.debug("initialization executed.");
	}

	public __registeredEffects: (
		| EventEffect
		| MutationObserver
		| ResizeObserver
	)[][] = [];

	private async setupEffects() {
		const registeredEffects = await Promise.all([
			setupEventEffects(),
			setupElementEffects(),
		]);
		this.__registeredEffects = registeredEffects;
	}

	public unregisterEffects() {
		for (const __effects of this.__registeredEffects) {
			for (const effect of __effects) {
				if ("dispose" in effect) {
					effect.dispose();
				} else {
					effect.disconnect();
				}
			}
		}
	}
}
