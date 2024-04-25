import {
	siteMetaState,
	operationState,
} from "@/core/repositories/contentScript.repository.js";
import { snapshot, subscribe } from "valtio";
import { watch, subscribeKey } from "valtio/utils";

export class StateDriven {
	async initialization() {
		logger.debug("StateDriven initialization.");
		if (import.meta.env.VITE_DEBUG_STATE_LOG === "true") {
			this.debugState();
		}
	}

	debugState() {
		subscribe(siteMetaState, (op) => {
			const s = snapshot(siteMetaState);
			logger.debug("siteMetaState is mutated", s, op);
		});
	}

	setup() {
		this.videoModeDriven();
	}

	videoModeDriven() {
		subscribeKey(siteMetaState, "videoPlayerMode", (value) => {
			logger.info("videoModeなう", value);
			// TODO: Behaviorを変更する
			// repoの段階でbehaviorをderive で 追従させる？？
		});
	}

	metaStateDriven() {
		watch((get) => {
			logger.fatal("not impl");
			// const metaState = get(siteMetaState);
			// metaState.videoPlayerMode
		});
	}
}
