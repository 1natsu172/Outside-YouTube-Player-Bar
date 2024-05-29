import type { VideoPlayerModeWithoutNone } from "@/core/mains/contentScriptState.js";
import { FormFieldsCard } from "../../../layouts/FormSection.js";
import { AlwaysDisplayPlayerBarField } from "./AlwaysDisplayPlayerBarField/index.js";
import { createInheritablePositionPlayerBarSelect } from "./InheritPositionPlayerBarBeforeSwitchingField/fieldLibs.js";
import { InheritPositionPlayerBarBeforeSwitching } from "./InheritPositionPlayerBarBeforeSwitchingField/index.js";
import { createPlayerBarPisitonSelect } from "./PositionPlayerBarField/formLibs.js";
import { PositionPlayerBar } from "./PositionPlayerBarField/index.js";
import { useExtensionBehaviorForm, useFormTitle } from "./formLogic.js";

type P = {
	videoModeKey: VideoPlayerModeWithoutNone;
};

export const ExtensionBehaviorForm = ({ videoModeKey }: P) => {
	const formLogic = useExtensionBehaviorForm(videoModeKey);
	const formTitle = useFormTitle(videoModeKey);
	return (
		<FormFieldsCard title={formTitle.title} Icon={formTitle.icon}>
			<PositionPlayerBar
				formLogic={formLogic}
				segmentedControlItems={createPlayerBarPisitonSelect()}
			/>
			<AlwaysDisplayPlayerBarField formLogic={formLogic} />
			<InheritPositionPlayerBarBeforeSwitching
				formLogic={formLogic}
				comboboxData={createInheritablePositionPlayerBarSelect(videoModeKey)}
			/>
		</FormFieldsCard>
	);
};
