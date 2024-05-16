import { checkAboutForceDisable } from "@/core/services/optionsServices/forceDisable.service.js";
import { TanstackQueryErrorResetBoundary } from "@/sharedUI/Provider/TanstackQueryProvider.js";
import { Card } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { LoadingSpinner } from "../../parts/LoadingSpinner/index.js";
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
			<Card withBorder radius="lg" p="xl" mb="xl" className={style.card}>
				{Array.from(ExtensionBehaviorOptionsFormDefs.entries()).map(
					([formId, def], index) => RenderFormDef(formId, def, index),
				)}
			</Card>
			<Card withBorder radius="lg" p="xl" mb="xl" className={style.card}>
				{Array.from(UiEnhanceOptionsFormDefs.entries()).map(
					([formId, def], index) => RenderFormDef(formId, def, index),
				)}
			</Card>
			<Card withBorder radius="lg" p="xl" className={style.card}>
				{Array.from(ExtensionMetaOptionsFormDefs.entries()).map(
					([formId, def], index) => RenderFormDef(formId, def, index),
				)}
			</Card>
		</>
	);
};

const DeactivateForceDisableForm = () => {
	return (
		<Card withBorder radius="lg" p="xl" className={style.card}>
			{RenderFormDef(
				"Form:ForceDisable",
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				ExtensionMetaOptionsFormDefs.get("Form:ForceDisable")!,
				1,
			)}
		</Card>
	);
};

export const SettingsForm = () => {
	const { data } = useSuspenseQuery({
		queryKey: [checkAboutForceDisable.name],
		queryFn: checkAboutForceDisable,
	});

	if (data.isDisabling) {
		return <DeactivateForceDisableForm />;
	}
	return <UserSettingsForm />;
};
