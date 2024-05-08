import { Card, Group } from "@mantine/core";
import type { ReactNode } from "react";
import type { FormDef } from "./FormDefinition.js";
import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { debugMode } from "@/core/repositories/options.repository.js";

type FormGroupP = {
	children?: ReactNode;
	formDef: FormDef;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	formState?: any;
};
export const FormGroup = ({ children, formDef, formState }: FormGroupP) => {
	const { id } = formDef;
	const { store: isDebug } = useStorage(debugMode);

	return (
		<Group
			// justify="space-between"
			// className={classes.item}
			wrap="nowrap"
			gap="xl"
			key={id}
		>
			{children}
			{isDebug && (
				<Card>
					<pre className="m-0">{JSON.stringify(formState, null, 2)}</pre>
				</Card>
			)}
		</Group>
	);
};
