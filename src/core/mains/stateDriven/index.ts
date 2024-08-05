import {
	behaviorState,
	operationState,
	siteMetaState,
} from "@/core/repositories/contentScript.repository.js";
import { snapshot, subscribe } from "valtio/vanilla";
import { reflectFunctionality } from "./__reflectFunctionality__.js";
import { behaviorDriven } from "./behaviorStateDriven.js";
import { oypbEnableDriven } from "./operationStateDriven.js";
import {
	navigationDriven,
	videoPlayerModeDriven,
} from "./siteMetaStateDriven.js";

export class StateDriven {
	public async setup() {
		logger.debug("Start StateDriven setup.");
		this.debugState();
		this.start();
		logger.debug("Done StateDriven setup.", {
			cleanupFunctions: this.#cleanupFunctions,
		});
	}

	private subscriveDrivens(drivens: (() => () => void)[]) {
		for (const driven of drivens) {
			this.#cleanupFunctions.push(driven());
		}
	}

	private start() {
		const drivens = [
			behaviorDriven,
			videoPlayerModeDriven,
			navigationDriven,
			oypbEnableDriven,
			reflectFunctionality,
		];

		this.subscriveDrivens(drivens);
	}

	private debugState() {
		if (import.meta.env.VITE_DEBUG_STATE_LOG === "true") {
			this.subscriveDrivens([
				() =>
					subscribe(siteMetaState, (op) => {
						const s = snapshot(siteMetaState);
						logger.debug("siteMetaState is mutated", s, op);
					}),
				() =>
					subscribe(behaviorState, (op) => {
						const s = snapshot(behaviorState);
						logger.debug("behaviorState is mutated", s, op);
					}),
				() =>
					subscribe(operationState, (op) => {
						const s = snapshot(operationState);
						logger.debug("operationState is mutated", s, op);
					}),
			]);
		}
	}

	#cleanupFunctions: (() => void)[] = [];

	public unsubscribeDrivens() {
		for (const cleanup of this.#cleanupFunctions) {
			cleanup();
		}
	}
}
