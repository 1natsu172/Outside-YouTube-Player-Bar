/**
 * NOTE: Browser extension capture must be scoped.
 * ref: https://docs.sentry.io/platforms/javascript/best-practices/shared-environments/
 */
import {
	type SDK,
	browserCaptureSdk,
	reactCaptureSdk,
} from "@/core/infrastructures/observabilities/index.js";
import { isMatchingPhrasePattern } from "@/utils/validateUtils/matchPattern.js";
import type { Integration } from "@sentry/types";
import defu from "defu";
import { SENTRY_PUB_DSN, ignoreErrors } from "./constants.js";

function createScopedClient<_SDK extends SDK>({
	sdk,
	tags,
	options,
}: {
	sdk: _SDK;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	tags: Record<string, any>;
	/**
	 * @description when pass undefined that use best practice ignore pattern
	 */
	options?: {
		ignoreIntegrations?: string[];
		additionalIntegrations?: Integration[];
	};
}) {
	const mergedOptions = defu<
		Exclude<Required<typeof options>, undefined>,
		[Exclude<typeof options, undefined>]
	>(options, {
		ignoreIntegrations: ["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"],
		additionalIntegrations: [],
	});

	const {
		BrowserClient,
		Scope,
		defaultStackParser,
		getDefaultIntegrations,
		makeFetchTransport,
	} = sdk;

	if (!__APP_VERSION__) {
		throw Error("not defined __APP_VERSION__");
	}

	logger.info("__APP_VERSION__ is", __APP_VERSION__);

	// filter integrations that use the global variable
	// https://docs.sentry.io/platforms/javascript/configuration/integrations/
	const integrations = [
		...getDefaultIntegrations({}),
		...mergedOptions.additionalIntegrations,
	].filter((defaultIntegration) => {
		// logger.info("defaultIntegration", defaultIntegration);
		return !mergedOptions.ignoreIntegrations.includes(defaultIntegration.name);
	});

	logger.info("integrations", integrations);

	const client = new BrowserClient({
		dsn: SENTRY_PUB_DSN,
		transport: makeFetchTransport,
		stackParser: defaultStackParser,
		integrations: integrations,
		release: __APP_VERSION__,
		ignoreErrors: ignoreErrors,
		beforeSend: (event, hint) => {
			const { originalException } = hint;
			if (originalException) {
				const errorMessage: string | undefined =
					// @ts-expect-error cuz unknown
					originalException?.reason?.message ?? originalException?.message;

				if (errorMessage) {
					const shouldIgnore = ignoreErrors.some((pattern) => {
						return isMatchingPhrasePattern(errorMessage, pattern);
					});

					if (shouldIgnore) {
						return null;
					}
				}
			}
			return event;
		},
	});

	const scope = new Scope();

	scope.setClient(client);
	client.init(); // initializing has to be done after setting the client on the scope
	scope.setTags(tags);
	logger.debug(tags, " scoped capture client instance created.");

	return { client: scope } as const;
}

// TODO(feature): アプリケーションエントリーポイントで早期Initしたくなったらinitプロパティを生やして明示的createInstanceをできるようにする
function createCaptureClientRepo(
	initParams: Parameters<typeof createScopedClient>[number],
) {
	let clientInstance: ReturnType<typeof createScopedClient>["client"] | null =
		null;

	return new Proxy({} as ReturnType<typeof createScopedClient>["client"], {
		get(_, prop, receiver) {
			if (!clientInstance) {
				clientInstance = createScopedClient(initParams).client;
			}
			return Reflect.get(clientInstance, prop, receiver);
		},
	});
}

export const browserCaptureClientRepo = createCaptureClientRepo({
	sdk: browserCaptureSdk,
	tags: { clientName: "browserCapture" },
});

export const reactCaptureClientRepo = createCaptureClientRepo({
	sdk: reactCaptureSdk,
	tags: { clientName: "reactCapture" },
});

export const serviceWorkerCaptureClientRepo = createCaptureClientRepo({
	sdk: browserCaptureSdk,
	tags: { clientName: "serviceWorkerCapture" },
});
