import { useForm } from "@tanstack/react-form";
import {
	type DefaultError,
	type QueryKey,
	type UseMutationResult,
	type UseSuspenseQueryResult,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { type ReactNode, useMemo } from "react";

export type UseAutoSaveFormOption<
	TQueryFnData,
	TQueryError,
	TQueryData,
	TQueryKey extends QueryKey,
	TMutateData,
	TMutateError,
	TMutateVariables,
	TMutateContext,
> = {
	useSuspenseQueryArgs: Parameters<
		typeof useSuspenseQuery<TQueryFnData, TQueryError, TQueryData, TQueryKey>
	>;
	useMutationArgs: Parameters<
		typeof useMutation<
			TMutateData,
			TMutateError,
			TMutateVariables,
			TMutateContext
		>
	>;
};

/**
 * @description mutate関数を実行するとonAutoSaveが実行される
 * @todo: テスト書く
 */
export const useAutoSaveForm = <
	TQueryFnData = unknown,
	TQueryError = DefaultError,
	TQueryData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
	TMutateData = unknown,
	TMutateError = DefaultError,
	TMutateVariables = void,
	TMutateContext = unknown,
>(
	option: UseAutoSaveFormOption<
		TQueryFnData,
		TQueryError,
		TQueryData,
		TQueryKey,
		TMutateData,
		TMutateError,
		TMutateVariables,
		TMutateContext
	>,
) => {
	const {
		useSuspenseQueryArgs: [useSuspenseQueryOptions],
		useMutationArgs: [useMutationOptions],
	} = option;

	const queryClient = useQueryClient();
	const queryResult = useSuspenseQuery<
		TQueryFnData,
		TQueryError,
		TQueryData,
		TQueryKey
	>(useSuspenseQueryOptions);

	const mutationResult = useMutation<
		TMutateData,
		TMutateError,
		TMutateVariables,
		TMutateContext
	>({
		mutationFn: useMutationOptions.mutationFn,
		onSettled: async (...args) => {
			await useMutationOptions.onSettled?.(...args);
			return await queryClient.invalidateQueries({
				queryKey: useSuspenseQueryOptions.queryKey,
			});
		},
	});
	return [queryResult, mutationResult] as const;
};

export const AutoSaveForFormField = <
	TQueryFnData = unknown,
	TQueryError = DefaultError,
	TQueryData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
	TMutateData = unknown,
	TMutateError = DefaultError,
	TMutateVariables = void,
	TMutateContext = unknown,
>(props: {
	option: UseAutoSaveFormOption<
		TQueryFnData,
		TQueryError,
		TQueryData,
		TQueryKey,
		TMutateData,
		TMutateError,
		TMutateVariables,
		TMutateContext
	>;
	children: (
		renderProps: readonly [
			queryResult: UseSuspenseQueryResult<TQueryData, TQueryError>,
			mutationResult: UseMutationResult<
				TMutateData,
				TMutateError,
				TMutateVariables,
				TMutateContext
			>,
		],
	) => ReactNode;
}) => {
	const { children, option } = props;
	const [queryResult, mutationResult] = useAutoSaveForm(option);

	const renderProps = useMemo(
		() => [queryResult, mutationResult] as const,
		[queryResult, mutationResult],
	);

	return <>{children(renderProps)}</>;
};
