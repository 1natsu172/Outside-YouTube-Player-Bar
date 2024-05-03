import { operationState } from "@/core/repositories/contentScript.repository.js";
import { setupEventEffects } from "@/core/services/eventEffectServices/eventEffects.service.js";
import { applyCompatibilityStyles } from "@/core/services/styleAffectServices/applyCompatibilityStyles.service.js";
import {
	oypbEnableOperation,
	doneInitializeOperation,
} from "@/core/services/operationServices/index.js";
import { setupElementEffects } from "@/core/services/elementEffectServices/elementEffects.service.js";
import type { EventEffect } from "@/core/services/eventEffectServices/libs/eventEffect.js";
import { StateDriven } from "@/core/mains/stateDriven/index.js";
import {
	getSiteVersion,
	registerInitializationLocation,
} from "@/core/services/siteMetaServices/index.js";

export class Executor {
	private stateDriven: StateDriven;

	constructor() {
		this.stateDriven = new StateDriven();
	}

	async initialization() {
		if (operationState.flagOps.doneInitialize) {
			logger.warn("oops, initialize seems to have been called multiple times!");
			return;
		}

		logger.debug("initialization executing.");
		await this.setupEffects();
		await applyCompatibilityStyles();
		await this.stateDriven.setup();
		oypbEnableOperation(true);
		registerInitializationLocation();
		getSiteVersion();
		doneInitializeOperation();
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
