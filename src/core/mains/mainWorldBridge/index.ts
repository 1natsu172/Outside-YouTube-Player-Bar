import { mainWorldSignals } from "@/core/mains/messagings/mainWorldSignals/index.js";
import { setMainWorldFlag } from "@/core/usecases/operationState.usecase.js";

export class MainWorldBridge {
	async init() {
		this.receiveScriptOnReady();
		await this.injectScript();
	}

	async injectScript() {
		await injectScript("/youtube-mainworld.js", { keepInDom: true });
	}

	receiveScriptOnReady() {
		mainWorldSignals.onMessage("scriptReady", ({ data }) => {
			setMainWorldFlag({
				scriptReady: data,
			});
		});
	}
}
