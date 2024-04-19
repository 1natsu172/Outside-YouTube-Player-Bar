import { debugMode } from "@/core/repositories/options.repository.js";

export const changeDebugMode = async (to: boolean) => {
	await debugMode.setValue(to);
};
