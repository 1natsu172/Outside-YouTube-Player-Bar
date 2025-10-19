/**
 * Copied by https://github.com/getsentry/sentry-javascript/blob/51e015cd34b636a37a5c548a7d8338017c9c2af5/packages/react/src/error.ts
 * REASON: For inject to Scoped Client (Best practice is https://docs.sentry.io/platforms/javascript/best-practices/shared-environments/ but provided utils are not support scoped client.)
 */

import type { EventHint } from "@sentry/core";
import { isError } from "@sentry/core";
import type { ErrorInfo } from "react";
import { version } from "react";
import { reactCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";

/**
 * See if React major version is 17+ by parsing version string.
 */
function isAtLeastReact17(reactVersion: string): boolean {
	const reactMajor = reactVersion.match(/^([^.]+)/);
	return reactMajor !== null && Number.parseInt(reactMajor[0]) >= 17;
}

/**
 * Recurse through `error.cause` chain to set cause on an error.
 */
function setCause(error: Error & { cause?: Error }, cause: Error): void {
	const seenErrors = new WeakSet();

	function recurse(error: Error & { cause?: Error }, cause: Error): void {
		// If we've already seen the error, there is a recursive loop somewhere in the error's
		// cause chain. Let's just bail out then to prevent a stack overflow.
		if (seenErrors.has(error)) {
			return;
		}
		if (error.cause) {
			seenErrors.add(error);
			// @ts-expect-error
			// biome-ignore lint/correctness/noVoidTypeReturn: <explanation>
			return recurse(error.cause, cause);
		}
		error.cause = cause;
	}

	recurse(error, cause);
}

/**
 * Captures an error that was thrown by a React ErrorBoundary or React root.
 *
 * @param error The error to capture.
 * @param errorInfo The errorInfo provided by React.
 * @param hint Optional additional data to attach to the Sentry event.
 * @returns the id of the captured Sentry event.
 */
export function captureReactException(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	error: any,
	{ componentStack }: ErrorInfo,
	hint?: EventHint,
): string {
	// If on React version >= 17, create stack trace from componentStack param and links
	// to to the original error using `error.cause` otherwise relies on error param for stacktrace.
	// Linking errors requires the `LinkedErrors` integration be enabled.
	// See: https://reactjs.org/blog/2020/08/10/react-v17-rc.html#native-component-stacks
	//
	// Although `componentDidCatch` is typed to accept an `Error` object, it can also be invoked
	// with non-error objects. This is why we need to check if the error is an error-like object.
	// See: https://github.com/getsentry/sentry-javascript/issues/6167
	if (isAtLeastReact17(version) && isError(error) && componentStack) {
		const errorBoundaryError = new Error(error.message);
		errorBoundaryError.name = `React ErrorBoundary ${error.name}`;
		errorBoundaryError.stack = componentStack;

		// Using the `LinkedErrors` integration to link the errors together.
		// @ts-expect-error
		setCause(error, errorBoundaryError);
	}

	return reactCaptureClient.captureException(error, {
		...hint,
		captureContext: {
			contexts: { react: { componentStack } },
		},
	});
}

/**
 * Creates an error handler that can be used with the `onCaughtError`, `onUncaughtError`,
 * and `onRecoverableError` options in `createRoot` and `hydrateRoot` React DOM methods.
 *
 * @param callback An optional callback that will be called after the error is captured.
 * Use this to add custom handling for errors.
 *
 * @example
 *
 * ```JavaScript
 * const root = createRoot(container, {
 *  onCaughtError: Sentry.reactErrorHandler(),
 *  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
 *    console.warn('Caught error', error, errorInfo.componentStack);
 *  });
 * });
 * ```
 */
export function reactErrorHandler(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	callback?: (error: any, errorInfo: ErrorInfo, eventId: string) => void,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
): (error: any, errorInfo: ErrorInfo) => void {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (error: any, errorInfo: ErrorInfo) => {
		const eventId = captureReactException(error, errorInfo);
		if (callback) {
			callback(error, errorInfo, eventId);
		}
	};
}
