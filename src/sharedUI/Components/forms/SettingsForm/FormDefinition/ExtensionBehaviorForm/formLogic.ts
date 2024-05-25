import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import { resolveBehaviorOptionHandlers } from "@/core/services/optionsServices/userOptions.service.js";
import { useAutoSaveForm } from "../../../utils/useAutoSaveForm.js";

export function useExtensionBehaviorForm(mode: VideoPlayerModeWithoutNone) {
	const { usecase, presenter } = resolveBehaviorOptionHandlers(mode);
	const formLogic = useAutoSaveForm({
		useSuspenseQueryArgs: [
			{ queryKey: [presenter.name, { mode }], queryFn: presenter },
		],
		useMutationArgs: [{ mutationFn: usecase }],
	});
	return formLogic;
}

export type FormLogic = ReturnType<typeof useExtensionBehaviorForm>;

export function useFormTitle(params: VideoPlayerModeWithoutNone) {
	switch (params) {
		case "defaultView": {
			return browser.i18n.getMessage(
				"settings_userOption_defaultViewBehavior_title",
			);
		}
		case "theaterMode": {
			return browser.i18n.getMessage(
				"settings_userOption_theaterModeBehavior_title",
			);
		}
		case "fullscreen": {
			return browser.i18n.getMessage(
				"settings_userOption_fullscreenBehavior_title",
			);
		}
	}
}
