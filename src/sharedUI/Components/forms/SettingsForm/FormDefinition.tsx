import { FormFieldWithAutoSave, FormFieldView } from "./FormField.js";
import { switchDebugMode } from "@/core/services/optionsServices/extensionMetaOptions.service.js";
import {
	setDefaultViewBehaviorOption,
	setTheaterModeBehaviorOption,
	setFullscreenBehaviorOption,
	setShowOpenSettingsIconOption,
} from "@/core/services/optionsServices/userOptions.service.js";
import { getDefaultViewBehaviorOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import {
	useSuspenseQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { LoadingSpinner } from "../../parts/LoadingSpinner/index.js";
import {
	Card,
	SegmentedControl,
	Switch,
	type SegmentedControlItem,
} from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { FormGroup } from "./FormGroup.js";

export interface FormDef<
	ID extends string = string,
	FieldID extends string = string,
> {
	id: ID;
	title: string;
	description?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	getFormDataFn: (...args: any) => Promise<any>;
	fieldDefs: Map<FieldID, FieldDef>;
	FormElement: (props: { formDef: FormDef<ID> }) => JSX.Element;
}
export interface FieldDef<FieldID extends string = string> {
	id: FieldID;
	title: string;
	description?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	setFieldDataFn: (...args: any) => Promise<any>;
}
export type FormDefs<ID extends string = string> = Map<ID, FormDef<ID>>;

const playerBarPisitonSelect: SegmentedControlItem[] = [
	{
		label: browser.i18n.getMessage(
			"settings_userOption_positionPlayerBar_inside",
		),
		value: "inside",
	},
	{
		label: browser.i18n.getMessage(
			"settings_userOption_positionPlayerBar_outside",
		),
		value: "outside",
	},
];

export const formDefs = new Map([
	[
		"FORM:defaultViewBehaviorOption",
		{
			id: "FORM:defaultViewBehaviorOption",
			title: browser.i18n.getMessage(
				"settings_userOption_defaultViewBehavior_title",
			),
			getFormDataFn: getDefaultViewBehaviorOption,
			fieldDefs: new Map([
				[
					"FIELD:positionPlayerBar",
					{
						id: "FIELD:positionPlayerBar",
						title: browser.i18n.getMessage(
							"settings_userOption_positionPlayerBar_title",
						),
						setFieldDataFn: setDefaultViewBehaviorOption,
					},
				],
				[
					"FIELD:alwaysDisplayPlayerBar",
					{
						id: "FIELD:alwaysDisplayPlayerBar",
						title: browser.i18n.getMessage(
							"settings_userOption_alwaysDisplayPlayerBar_title",
						),
						setFieldDataFn: setDefaultViewBehaviorOption,
					},
				],
			]),
			FormElement: (props) => {
				const { formDef } = props;
				const queryKey = [formDef.id];
				const { data, isLoading } = useSuspenseQuery({
					queryKey: queryKey,
					queryFn: getDefaultViewBehaviorOption,
				});
				// TODO: あとでコメントアウト消す
				// const queryClient = useQueryClient();
				// const { mutate, isPending } = useMutation<
				// 	unknown,
				// 	Error,
				// 	Partial<typeof data>
				// >({
				// 	mutationFn: async (value) => {
				// 		await setDefaultViewBehaviorOption(value);
				// 	},
				// 	onSettled: async () => {
				// 		return await queryClient.invalidateQueries({ queryKey: queryKey });
				// 	},
				// });

				return (
					<FormGroup formDef={formDef} formState={data}>
						<FormFieldWithAutoSave
							queryKey={queryKey}
							mutationFn={async (value) => {
								await setDefaultViewBehaviorOption(value);
							}}
						>
							{({ mutate, isPending }) => (
								<FormFieldView isLoading={isPending} title="" description="">
									<SegmentedControl
										data={playerBarPisitonSelect}
										value={data.positionPlayerBar}
										onChange={(e) => {
											mutate({
												positionPlayerBar: e as typeof data.positionPlayerBar,
											});
										}}
										fullWidth
										disabled={isLoading || isPending}
									/>
								</FormFieldView>
							)}
						</FormFieldWithAutoSave>
						<FormFieldWithAutoSave
							queryKey={queryKey}
							mutationFn={async (value) => {
								await setDefaultViewBehaviorOption(value);
							}}
						>
							{({ mutate, isPending }) => (
								<FormFieldView isLoading={isPending} title="" description="">
									<Switch
										checked={data.alwaysDisplayPlayerBar}
										onChange={(e) => {
											mutate({ alwaysDisplayPlayerBar: e.target.checked });
										}}
										offLabel="OFF"
										onLabel="ON"
										disabled={isLoading || isPending}
									/>
								</FormFieldView>
							)}
						</FormFieldWithAutoSave>
					</FormGroup>
				);
			},
		},
	],
]) satisfies FormDefs;
