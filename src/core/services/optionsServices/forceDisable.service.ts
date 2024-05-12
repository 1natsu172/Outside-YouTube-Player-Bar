import * as usecases from "@/core/usecases/options.usecase.js";
import semver_lt from "semver/functions/lt.js";
import { getForceDisableOption } from "@/core/presenters/storagePresenter/options.presenter.js";

export const switchForceDisable = async (activate: boolean) => {
	await usecases.setForceDisableOption(activate, {
		extensionVersion: browser.runtime.getManifest().version,
	});
	browser.runtime.reload();
};

export const checkAboutForceDisable = async (): Promise<{
	isDisabling: boolean;
	canDeactivateForceDisable: boolean;
}> => {
	const {
		value: isDisabling,
		meta: { extensionVersion: prevDisabledVersion },
	} = await getForceDisableOption();

	const shouldCheckVersion =
		isDisabling && typeof prevDisabledVersion === "string";

	let canDeactivateForceDisable = false;

	if (shouldCheckVersion) {
		canDeactivateForceDisable = semver_lt(
			prevDisabledVersion,
			browser.runtime.getManifest().version,
		);
	}

	return {
		isDisabling,
		canDeactivateForceDisable,
	};
};

export const initializeForceDisable = async (): Promise<{
	canProcessContinue: boolean;
}> => {
	const { isDisabling } = await checkAboutForceDisable();

	return {
		canProcessContinue: !isDisabling,
	};
};
