import type React from "react";

export interface FormDef {
	FormElement: (props: { formId: string }) => React.JSX.Element;
}
export type FormDefs<FormID extends `Form:${string}` = `Form:${string}`> = Map<
	FormID,
	FormDef
>;
