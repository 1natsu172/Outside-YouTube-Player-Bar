import {
	siteMetaState,
	operationState,
	currentBehaviorState,
} from "@/core/repositories/contentScript.repository.js";
import { snapshot, subscribe } from "valtio";
// import {watch} from 'valtio/utils'
import { currentBehaviorDriven } from "./behaviorStateDriven.js";
// import {} from './operationStateDriven.js'
import { videoPlayerModeDriven } from "./siteMetaStateDriven.js";

export class StateDriven {
	async setup() {
		logger.debug("StateDriven initialization.");
		this.debugState();
		currentBehaviorDriven();
		videoPlayerModeDriven();
	}

	debugState() {
		if (import.meta.env.VITE_DEBUG_STATE_LOG === "true") {
			subscribe(siteMetaState, (op) => {
				const s = snapshot(siteMetaState);
				logger.debug("siteMetaState is mutated", s, op);
			});
			subscribe(currentBehaviorState, (op) => {
				const s = snapshot(currentBehaviorState);
				logger.debug("currentBehaviorState is mutated", s, op);
			});
			subscribe(operationState, (op) => {
				const s = snapshot(operationState);
				logger.debug("operationState is mutated", s, op);
			});
		}
	}
}
