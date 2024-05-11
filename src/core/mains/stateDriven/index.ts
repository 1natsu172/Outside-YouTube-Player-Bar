import {
	siteMetaState,
	operationState,
	behaviorState,
} from "@/core/repositories/contentScript.repository.js";
import { snapshot, subscribe } from "valtio/vanilla";
import { behaviorDriven } from "./behaviorStateDriven.js";
import { oypbEnableDriven } from "./operationStateDriven.js";
import {
	navigationDriven,
	videoPlayerModeDriven,
} from "./siteMetaStateDriven.js";
import { reflectFunctionality } from "./__reflectFunctionality__.js";

export class StateDriven {
	async setup() {
		logger.debug("StateDriven initialization.");
		this.debugState();
		behaviorDriven();
		videoPlayerModeDriven();
		navigationDriven();
		oypbEnableDriven();
		reflectFunctionality();
	}

	debugState() {
		if (import.meta.env.VITE_DEBUG_STATE_LOG === "true") {
			subscribe(siteMetaState, (op) => {
				const s = snapshot(siteMetaState);
				logger.debug("siteMetaState is mutated", s, op);
			});
			subscribe(behaviorState, (op) => {
				const s = snapshot(behaviorState);
				logger.debug("behaviorState is mutated", s, op);
			});
			subscribe(operationState, (op) => {
				const s = snapshot(operationState);
				logger.debug("operationState is mutated", s, op);
			});
		}
	}
}
