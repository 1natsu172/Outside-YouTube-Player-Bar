import { extMetaSignals } from "@/core/mains/messagings/extensionMetaSignals/index.js";
import { getForceDisableOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import * as usecases from "@/core/usecases/options.usecase.js";
import semver_lt from "semver/functions/lt.js";

export const switchForceDisable = async (activate: boolean) => {
	await usecases.setForceDisableOption(activate, {
		disabledExtensionVersion: activate
			? browser.runtime.getManifest().version
			: undefined,
		continueForceDisableForNow: undefined,
	});

	await extMetaSignals.sendMessage("reloadYouTubeTabs", undefined);
};

export const switchContinueForceDisableForNow = async ({
	isContinue,
}: { isContinue: boolean }) => {
	const continueForceDisableForNow = isContinue
		? {
				isContinue: true,
				continueChoosedExtensionVersion: browser.runtime.getManifest().version,
			}
		: ({ isContinue: false } as const);
	await usecases.setForceDisableOption(undefined, {
		continueForceDisableForNow,
	});
};

export const checkAboutForceDisable = async (): Promise<{
	isDisabling: boolean;
	hasBeenUpdateAfterForceDisable: boolean;
	choosingToContinue: boolean;
	hasBeenUpdateAfterContinueChoosed: boolean;
	isShowUpdateRed: boolean;
}> => {
	const {
		value: isDisabling,
		meta: { disabledExtensionVersion, continueForceDisableForNow },
	} = await getForceDisableOption();

	const shouldCheckVersion =
		isDisabling && typeof disabledExtensionVersion === "string";

	let hasBeenUpdateAfterForceDisable = false;

	if (shouldCheckVersion) {
		hasBeenUpdateAfterForceDisable = semver_lt(
			disabledExtensionVersion,
			browser.runtime.getManifest().version,
		);
	}

	let hasBeenUpdateAfterContinueChoosed = false;

	if (
		shouldCheckVersion &&
		continueForceDisableForNow?.isContinue &&
		continueForceDisableForNow.continueChoosedExtensionVersion
	) {
		hasBeenUpdateAfterContinueChoosed = semver_lt(
			continueForceDisableForNow.continueChoosedExtensionVersion,
			browser.runtime.getManifest().version,
		);
	}

	const choosingToContinue = !!continueForceDisableForNow?.isContinue;

	const isShowUpdateRed =
		(isDisabling && choosingToContinue && hasBeenUpdateAfterContinueChoosed) ||
		(isDisabling && !choosingToContinue && hasBeenUpdateAfterForceDisable);

	return {
		isDisabling,
		hasBeenUpdateAfterForceDisable,
		choosingToContinue,
		hasBeenUpdateAfterContinueChoosed,
		isShowUpdateRed,
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
