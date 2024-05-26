import { ExtensionMetaForm } from "./ExtensionMetaForm/index.js";
import type { FormDefs } from "./formDefinition.types.js";

/**
 * @description Enumerate component implementations
 */
export const ExtensionMetaOptionsFormDefs = new Map([
	[
		"Form:ExtensionMeta",
		{
			FormElement: () => {
				return <ExtensionMetaForm />;
			},
		},
	],
]) satisfies FormDefs;
