import { checkAboutForceDisable } from "@/core/services/optionsServices/forceDisable.service.js";
import { TanstackQueryErrorResetBoundary } from "@/sharedUI/Provider/TanstackQueryProvider.js";
import { Group } from "@mantine/core";
import {
	IconAdjustmentsHorizontal,
	IconBalloon,
	IconFlask,
} from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { LoadingSpinner } from "../../parts/LoadingSpinner/index.js";
import { FormGroup } from "../layouts/FormGroup.js";
import { ExtensionMetaOptionsFormDefs } from "./FormDefinition/ExtensionMetaOptions.definition.js";
import {
	ExtensionBehaviorOptionsFormDefs,
	UiEnhanceOptionsFormDefs,
} from "./FormDefinition/UserOptions.definition.js";
import type { FormDef } from "./FormDefinition/formDefinition.types.js";

const RenderFormDef = (formId: string, formDef: FormDef, index: number) => {
	const { FormElement } = formDef;
	return (
		<TanstackQueryErrorResetBoundary key={index}>
			<Suspense fallback={<LoadingSpinner />} key={index}>
				<FormElement formId={formId} />
			</Suspense>
		</TanstackQueryErrorResetBoundary>
	);
};

const UserSettingsForm = () => {
	return (
		<>
			<FormGroup title="Features" Icon={IconAdjustmentsHorizontal}>
				<Group grow wrap="nowrap" align="stretch">
					{Array.from(ExtensionBehaviorOptionsFormDefs.entries()).map(
						([formId, def], index) => RenderFormDef(formId, def, index),
					)}
				</Group>
			</FormGroup>
			<FormGroup title="UI" Icon={IconBalloon}>
				{Array.from(UiEnhanceOptionsFormDefs.entries()).map(
					([formId, def], index) => RenderFormDef(formId, def, index),
				)}
			</FormGroup>
			<FormGroup title="Misc" Icon={IconFlask}>
				{Array.from(ExtensionMetaOptionsFormDefs.entries()).map(
					([formId, def], index) => RenderFormDef(formId, def, index),
				)}
			</FormGroup>
		</>
	);
};

const DeactivateForceDisableForm = () => {
	return (
		<FormGroup title="Misc" Icon={IconFlask}>
			{RenderFormDef(
				"Form:DeactivateForceDisable",
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				ExtensionMetaOptionsFormDefs.get("Form:ExtensionMeta")!,
				1,
			)}
		</FormGroup>
	);
};

export const SettingsForm = () => {
	const { data } = useSuspenseQuery({
		queryKey: [checkAboutForceDisable.name],
		queryFn: checkAboutForceDisable,
	});

	return (
		<>
			{data.isDisabling ? <DeactivateForceDisableForm /> : <UserSettingsForm />}
		</>
	);
};
