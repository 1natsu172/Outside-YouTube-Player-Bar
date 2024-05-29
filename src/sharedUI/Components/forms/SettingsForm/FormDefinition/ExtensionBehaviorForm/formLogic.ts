import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import { resolveBehaviorOptionHandlers } from "@/core/services/optionsServices/userOptions.service.js";
import { IconAppWindow, IconCrop169, IconMaximize } from "@tabler/icons-react";
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
			return {
				title: browser.i18n.getMessage(
					"settings_userOption_defaultViewBehavior_title",
				),
				icon: IconAppWindow,
			};
		}
		case "theaterMode": {
			return {
				title: browser.i18n.getMessage(
					"settings_userOption_theaterModeBehavior_title",
				),
				icon: IconCrop169,
			};
		}
		case "fullscreen": {
			return {
				title: browser.i18n.getMessage(
					"settings_userOption_fullscreenBehavior_title",
				),
				icon: IconMaximize,
			};
		}
	}
}
