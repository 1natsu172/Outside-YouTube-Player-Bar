import { subscribeKey } from "valtio/utils";
import { getFlagOps } from "@/core/presenters/statePresenter/operationState/index.js";
import { operationState } from "@/core/repositories/contentScript.repository.js";
import { domAffectOypbEnable } from "@/core/services/domAffectServices/domMetaAffect.service.js";

export const oypbEnableDriven = () => {
	return subscribeKey(operationState.flagOps, "oypbEnable", (value) => {
		logger.info("oypbEnable changed", value);
		domAffectOypbEnable(value);
	});
};

export function waitMainWorldReady() {
	const { promise, resolve } = Promise.withResolvers<void>();
	const unsubscribe = subscribeKey(
		operationState.flagOps,
		"mainWorld",
		({ scriptReady: isReady }) => {
			if (isReady) {
				logger.debug("MainWorld standby");
				unsubscribe();
				resolve();
			}
		},
	);

	const {
		mainWorld: { scriptReady: isReady },
	} = getFlagOps();

	if (isReady) {
		unsubscribe();
		setTimeout(() => {
			logger.debug("MainWorld already standby.");
			resolve();
		}, 0);
	}

	logger.debug("waiting MainWorld ready…");
	return promise;
}
