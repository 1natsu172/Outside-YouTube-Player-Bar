import { debugMode } from "@/core/repositories/optionsRepository.js";

export const changeDebugMode = async (to: boolean) => {
	await debugMode.setValue(to);
};
