export interface FormDef {
	FormElement: (props: { formId: string }) => JSX.Element;
}
export type FormDefs<FormID extends `Form:${string}` = `Form:${string}`> = Map<
	FormID,
	FormDef
>;
