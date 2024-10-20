import { MainWorldBridge } from "@/core/mains/mainWorldBridge/index.js";
import { StateDriven } from "@/core/mains/stateDriven/index.js";
import { operationState } from "@/core/repositories/contentScript.repository.js";
import {
	type ElementEffect,
	setupElementEffects,
} from "@/core/services/elementEffectServices/elementEffects.service.js";
import { setupEventEffects } from "@/core/services/eventEffectServices/eventEffects.service.js";
import type { EventEffect } from "@/core/services/eventEffectServices/libs/eventEffect.js";
import {
	type ObservabilityObserver,
	setupObservabilityObservers,
} from "@/core/services/observabilities/index.js";
import {
	doneInitializeOperation,
	oypbEnableOperation,
} from "@/core/services/operationServices/index.js";
import { initializeDebugMode } from "@/core/services/optionsServices/extensionMetaOptions.service.js";
import { initializeForceDisable } from "@/core/services/optionsServices/forceDisable.service.js";
import {
	getSiteVersion,
	registerInitializationLocation,
} from "@/core/services/siteMetaServices/index.js";
import { applyCompatibilityStyles } from "@/core/services/styleAffectServices/applyCompatibilityStyles.service.js";
import type { ContentScriptContext } from "wxt/client";

export class Executor {
	private stateDriven: StateDriven;
	private mainWorldBridge: MainWorldBridge;

	constructor(private ctx: ContentScriptContext) {
		this.stateDriven = new StateDriven();
		this.mainWorldBridge = new MainWorldBridge();
		// NOTE: https://wxt.dev/guide/handling-updates.html#content-script-cleanup
		this.ctx.onInvalidated(async () => {
			this.unregisterEffects();
			this.stateDriven.unsubscribeDrivens();
			await this.mainWorldBridge.cleanup();
		});
	}

	async initialization() {
		if (operationState.flagOps.doneInitialize) {
			logger.warn("oops, initialize seems to have been called multiple times!");
			return;
		}
		logger.debug("initialization executing.");

		// NOTE: initializeForceDisable must be first
		const { canProcessContinue } = await initializeForceDisable();
		if (!canProcessContinue) {
			logger.info(
				"Initialization stoped. Because forceDisable option is enabling.",
			);
			return;
		}
		// FIXME: implement the storage driven
		await initializeDebugMode().then((unwatch) => {
			this.__registeredEffects.push([unwatch]);
		});
		await this.mainWorldBridge.init();
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
		| ElementEffect
		| ObservabilityObserver
		| (() => void)
	)[][] = [];

	private async setupEffects() {
		const registeredEffects = await Promise.all([
			setupEventEffects(),
			setupElementEffects(),
			setupObservabilityObservers(),
		]);
		this.__registeredEffects = [
			...this.__registeredEffects,
			...registeredEffects,
		];
	}

	public unregisterEffects() {
		for (const __effects of this.__registeredEffects) {
			for (const effect of __effects) {
				if ("dispose" in effect) {
					effect.dispose();
				} else if ("disconnect" in effect) {
					effect.disconnect();
				} else if (typeof effect === "function") {
					if (this.ctx.isValid) {
						effect();
					}
				}
			}
		}
	}
}
