import { getDebugModeOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import * as repo from "@/core/repositories/options.repository.js";
import * as usecases from "@/core/usecases/options.usecase.js";
import { reCreateLoggerInstance } from "@/utils/logger.js";

export const initializeDebugMode = async () => {
	const isEnabledDebugByOption = await getDebugModeOption();
	if (isEnabledDebugByOption) {
		reCreateLoggerInstance({ isDebug: true });
	}
	// Support change option reacted.
	return repo.debugMode.watch((current, prev) => {
		if (current !== prev) {
			reCreateLoggerInstance({ isDebug: current });
		}
	});
};

export const switchDebugMode = async (changeTo: boolean) => {
	await usecases.setDebugModeOption(changeTo);
};
