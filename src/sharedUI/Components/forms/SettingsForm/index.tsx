import { checkAboutForceDisable } from "@/core/services/optionsServices/forceDisable.service.js";
import { TanstackQueryErrorResetBoundary } from "@/sharedUI/Provider/TanstackQueryProvider.js";
import { Group, Paper } from "@mantine/core";
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
import style from "./index.module.css";

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
			<FormGroup title="Features">
				<Group grow wrap="nowrap" align="stretch">
					{Array.from(ExtensionBehaviorOptionsFormDefs.entries()).map(
						([formId, def], index) => RenderFormDef(formId, def, index),
					)}
				</Group>
			</FormGroup>
			<FormGroup title="UI">
				{Array.from(UiEnhanceOptionsFormDefs.entries()).map(
					([formId, def], index) => RenderFormDef(formId, def, index),
				)}
			</FormGroup>
			<FormGroup title="Misc">
				{Array.from(ExtensionMetaOptionsFormDefs.entries()).map(
					([formId, def], index) => RenderFormDef(formId, def, index),
				)}
			</FormGroup>
		</>
	);
};

const DeactivateForceDisableForm = () => {
	return (
		<>
			{RenderFormDef(
				"Form:DeactivateForceDisable",
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				ExtensionMetaOptionsFormDefs.get("Form:ExtensionMeta")!,
				1,
			)}
		</>
	);
};

export const SettingsForm = () => {
	const { data } = useSuspenseQuery({
		queryKey: [checkAboutForceDisable.name],
		queryFn: checkAboutForceDisable,
	});

	return (
		<Paper mb="xl" className={style.card}>
			{data.isDisabling ? <DeactivateForceDisableForm /> : <UserSettingsForm />}
		</Paper>
	);
};
