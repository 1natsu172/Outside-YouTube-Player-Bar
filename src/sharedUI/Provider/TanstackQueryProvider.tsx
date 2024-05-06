import {
	QueryClient,
	type QueryClientConfig,
	QueryClientProvider,
	QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { Button } from "primereact/button";
import { type ReactNode, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
}: {
	children?: ReactNode;
}) => {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary
					onReset={reset}
					fallbackRender={({ resetErrorBoundary }) => (
						<div>
							There was an error!
							<Button onClick={() => resetErrorBoundary()}>Try again</Button>
						</div>
					)}
				>
					{children}
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
};
