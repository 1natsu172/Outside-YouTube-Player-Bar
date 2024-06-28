import { ErrorBoundary } from "@/sharedUI/libs/ErrorBoundary.js";
import {
	QueryClient,
	type QueryClientConfig,
	QueryClientProvider,
	QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import type { FallbackProps } from "react-error-boundary";

export const TanstackQueryClientProvider = (props: {
	children: React.ReactNode;
	config?: QueryClientConfig;
}) => {
	const [queryClient] = useState(() => new QueryClient(props.config));

	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	);
};

export const TanstackQueryErrorResetBoundary = ({
	children,
	fallbackRender,
}: {
	children?: ReactNode;
	fallbackRender?: (props: FallbackProps) => JSX.Element;
}) => {
	const fallbackElement = fallbackRender;
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary onReset={reset} fallbackRender={fallbackElement}>
					{children}
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
};
