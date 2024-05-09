import { Suspense } from "react";
import type { FormDef } from "./FormDefinition.js";
import { LoadingSpinner } from "../../parts/LoadingSpinner/index.js";
import { TanstackQueryErrorResetBoundary } from "@/sharedUI/Provider/TanstackQueryProvider.js";
import { SettingsFormDefs } from "./FormDefinition.js";
import { Card } from "@mantine/core";
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
		<Card withBorder radius="md" p="xl" className={style.card}>
			{Array.from(SettingsFormDefs.entries()).map(([formId, def], index) =>
				RenderFormDef(formId, def, index),
			)}
		</Card>
	);
};

export const SettingsForm = () => {
	return <UserSettingsForm />;
};
