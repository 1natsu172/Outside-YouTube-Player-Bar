import { hasInjected, isActive } from "../repositories/extensionState";
import { isVideoPage } from "./judgePage";

export const conditionsCollection = {
	// handle extension.active
	isActiveReady() {
		return isVideoPage() && !hasInjected();
	},

	// handle extension.inactive
	isInactiveReady() {
		return !isVideoPage() && hasInjected() && isActive();
	},
};
