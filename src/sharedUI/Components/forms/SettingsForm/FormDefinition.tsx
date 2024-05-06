import { SelectButton } from "primereact/selectbutton";
import { InputSwitch } from "primereact/inputswitch";
import { FormItem } from "./FormItem.js";
import { useForm } from "@tanstack/react-form";
import { switchDebugMode } from "@/core/services/optionsServices/extensionMetaOptions.service.js";
import {
	setDefaultViewBehaviorOption,
	setTheaterModeBehaviorOption,
	setFullscreenBehaviorOption,
	setShowOpenSettingsIconOption,
} from "@/core/services/optionsServices/userOptions.service.js";
import { getDefaultViewBehaviorOption } from "@/core/presenters/storagePresenter/options.presenter.js";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { SelectItemOptionsType } from "primereact/selectitem";

export interface FormDef {
	id: string;
	title: string;
	description: string;
	FormElement: (props: { formDef: FormDef }) => JSX.Element;
}

const playerBarPisitonSelect: SelectItemOptionsType = [
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

export const formDefs = [
	{
		id: setDefaultViewBehaviorOption.name,
		title: browser.i18n.getMessage(
			"settings_userOption_defaultViewBehavior_title",
		),
		description: "",
		FormElement: (props) => {
			const { formDef } = props;
			const { data, isLoading } = useSuspenseQuery({
				queryKey: ["data"],
				queryFn: getDefaultViewBehaviorOption,
			});
			const { state, store, useStore, Subscribe, handleSubmit, Field } =
				useForm({
					defaultValues: data,
					onSubmit: async ({ value }) => {
						logger.debug(value);
						await setDefaultViewBehaviorOption(value);
					},
				});
			// TODO: ここで無限レンダー
			useStore((store) => {
				// if (store.canSubmit) {
				// 	handleSubmit();
				// }
				logger.debug(store);
				return store.values;
			});
			logger.debug("isloaing", isLoading, state);
			return (
				<FormItem formDef={formDef} formState={state}>
					<div className="card flex justify-content-center">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								handleSubmit();
							}}
						>
							<Field name="positionPlayerBar">
								{({ handleChange, state }) => (
									<SelectButton
										value={state.value}
										onChange={(e) => handleChange(e.value)}
										options={playerBarPisitonSelect}
									/>
								)}
							</Field>
							<Field name="alwaysDisplayPlayerBar">
								{({ handleChange, state }) => (
									<InputSwitch
										checked={state.value}
										onChange={(e) => handleChange(e.value)}
									/>
								)}
							</Field>
						</form>
					</div>
				</FormItem>
			);
		},
	},
] as const satisfies FormDef[];
