import { Card } from "@mantine/core";
import { SettingsForm } from "../../forms/SettingsForm/index.js";
import { Suspense } from "react";
import { LoadingSpinner } from "../../parts/LoadingSpinner/index.js";

export const SettingsPanel = () => {
	return (
		<Card>
			<Suspense fallback={<LoadingSpinner />}>
				<SettingsForm />
			</Suspense>
		</Card>
	);
};
