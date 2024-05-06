import { Suspense } from "react";
import { formDefs, type FormDef } from "./FormDefinition.js";
import { LoadingSpinner } from "../../parts/LoadingSpinner/index.js";
import { TanstackQueryErrorResetBoundary } from "@/sharedUI/Provider/TanstackQueryProvider.js";

const RenderFormDef = (formDef: FormDef, index: number) => {
	const { FormElement } = formDef;
	return (
		<TanstackQueryErrorResetBoundary key={index}>
			<Suspense fallback={<LoadingSpinner />} key={index}>
				<FormElement formDef={formDef} />
			</Suspense>
		</TanstackQueryErrorResetBoundary>
	);
};

const UserSettingsForm = () => {
	return <div>{formDefs.map(RenderFormDef)}</div>;
};

export const SettingsForm = () => {
	return <UserSettingsForm />;
};
