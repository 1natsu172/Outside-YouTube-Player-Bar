import { reactCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";
import type { SetOptional } from "@/utils/typeUtils.js";
import { Button } from "@mantine/core";
import {
	type ErrorBoundaryProps,
	type ErrorBoundaryPropsWithRender,
	type FallbackProps,
	ErrorBoundary as _ErrorBoundary,
} from "react-error-boundary";

function _defaultFallbackRender({ resetErrorBoundary }: FallbackProps) {
	return (
		<div>
			There was an error!
			<Button onClick={() => resetErrorBoundary()}>Try again</Button>
		</div>
	);
}

type Props = SetOptional<ErrorBoundaryPropsWithRender, "fallbackRender">;
export const ErrorBoundary = (props: Props) => {
	const fallbackElement = props.fallbackRender ?? _defaultFallbackRender;
	// NOTE:FIXME: Sentry.Errorboundaryがscoped-clientでcaptureできない（グローバルクライアント利用前提の設計でclientを注入できない）ので実装を真似ているが、対応されたらSentryの実装に寄せる。ref: https://github.com/getsentry/sentry-javascript/blob/c7b8503018f9384bb4f68a2c3f86c43956fa8380/packages/react/src/error.ts
	const onError: ErrorBoundaryProps["onError"] = (error, info) => {
		const { componentStack } = info;
		reactCaptureClient.captureException(error, {
			captureContext: {
				contexts: { react: { componentStack } },
			},
		});
	};

	return (
		<_ErrorBoundary
			{...props}
			fallbackRender={fallbackElement}
			onError={onError}
		>
			{props.children}
		</_ErrorBoundary>
	);
};
