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
import { SENTRY_PUB_DSN, ignoreErrors } from "./constants.js";

function createScopedClient<_SDK extends SDK>({
	sdk,
	tags,
	ignoreIntegrations = ["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"],
	additionalIntegrations = [],
}: {
	sdk: _SDK;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	tags: Record<string, any>;
	/**
	 * @description when pass undefined that use best practice ignore pattern
	 */
	ignoreIntegrations?: string[];
	additionalIntegrations?: Integration[];
}) {
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
		...additionalIntegrations,
	].filter((defaultIntegration) => {
		// logger.info("defaultIntegration", defaultIntegration);
		return !ignoreIntegrations.includes(defaultIntegration.name);
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

class CaptureClientRepo<_SDK extends SDK> {
	private _client: ReturnType<typeof createScopedClient> | null = null;

	constructor(
		public sdk: _SDK,
		public clientName: string,

		public options?: {
			/**
			 * @description when pass undefined that use best practice ignore pattern
			 */
			ignoreIntegrations?: string[];
			additionalIntegrations?: Integration[];
		},
	) {}

	public get client(): ReturnType<typeof createScopedClient>["client"] {
		if (!this._client) {
			this._client = createScopedClient({
				sdk: this.sdk,
				tags: { clientName: this.clientName },
				ignoreIntegrations: this.options?.ignoreIntegrations,
				additionalIntegrations: this.options?.additionalIntegrations,
			});
		}
		return this._client.client;
	}
}

export const browserCaptureClientRepo = new CaptureClientRepo(
	browserCaptureSdk,
	"browserCapture",
);

export const reactCaptureClientRepo = new CaptureClientRepo(
	reactCaptureSdk,
	"reactCapture",
);

export const serviceWorkerCaptureClientRepo = new CaptureClientRepo(
	browserCaptureSdk,
	"serviceWorkerCapture",
);
