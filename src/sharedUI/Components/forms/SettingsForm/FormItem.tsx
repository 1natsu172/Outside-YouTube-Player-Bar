import type { ReactNode } from "react";
import type { FormDef } from "./FormDefinition.js";
import { Panel } from "primereact/panel";
import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { debugMode } from "@/core/repositories/options.repository.js";

type FormItemP = {
	children?: ReactNode;
	formDef: FormDef;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	formState?: any;
};
export const FormItem = ({ children, formDef, formState }: FormItemP) => {
	const { id, title, description } = formDef;
	const { store: isDebug } = useStorage(debugMode);
	return (
		<div key={id}>
			<h3>{title}</h3>
			<p>{description}</p>
			{children}
			{isDebug && (
				<Panel header="debug">
					<pre className="m-0">{JSON.stringify(formState, null, 2)}</pre>
				</Panel>
			)}
		</div>
	);
};
