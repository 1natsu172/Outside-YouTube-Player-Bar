import { Suspense } from "react";
import { SettingsForm } from "../../forms/SettingsForm/index.js";
import { LoadingSpinner } from "../../parts/LoadingSpinner/index.js";

export const SettingsPanel = () => {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<SettingsForm />
		</Suspense>
	);
};
