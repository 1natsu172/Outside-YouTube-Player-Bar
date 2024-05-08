import type { ReactNode } from "react";
import { formDefs, type FormDef } from "./FormDefinition.js";
import { Card, Group, Text, Title } from "@mantine/core";
import { LoadingSpinner } from "../../parts/LoadingSpinner/index.js";
import {
	useQueryClient,
	useMutation,
	type QueryKey,
	type MutationFunction,
} from "@tanstack/react-query";
import React, { useMemo } from "react";

type FormFieldViewP = {
	children?: ReactNode;
	title: string;
	description: string;
	isLoading: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	formState?: any;
};
export const FormFieldView = ({
	children: FormField,
	isLoading,
	title,
	description,
}: FormFieldViewP) => {
	return (
		<>
			<Group justify="space-between">
				<div>
					<Title>{title}</Title>
					<Text size="xs" c="dimmed">
						{description}
					</Text>
				</div>
				{FormField}
			</Group>
			{isLoading && <LoadingSpinner />}
		</>
	);
};

type FieldWithAutoSaveP = {
	children: (renderProps: {
		mutate: MutationFunction;
		isPending: boolean;
	}) => ReactNode;
	queryKey: QueryKey;
	mutationFn: MutationFunction;
};
export const FormFieldWithAutoSave = ({
	queryKey,
	mutationFn,
	children,
}: FieldWithAutoSaveP) => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation<
		unknown,
		Error,
		Partial<Parameters<typeof mutationFn>[0]>
	>({
		mutationFn: mutationFn,
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: queryKey });
		},
	});

	const renderProps = useMemo(
		() => ({
			mutate,
			isPending,
		}),
		[mutate, isPending],
	);

	return <>{children(renderProps)}</>;
};
