import { operationState } from "@/core/repositories/contentScript.repository.js";
import { domAffectOypbEnable } from "@/core/services/domAffectServices/domMetaAffect.service.js";
import { subscribeKey } from "valtio/utils";

export const oypbEnableDriven = () => {
	return subscribeKey(operationState, "oypbEnable", (value) => {
		logger.info("oypbEnable changed", value);
		domAffectOypbEnable(value);
	});
};
