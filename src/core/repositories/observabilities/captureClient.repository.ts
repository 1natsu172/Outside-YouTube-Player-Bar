/**
 * NOTE: Browser extension capture must be scoped.
 * ref: https://docs.sentry.io/platforms/javascript/best-practices/shared-environments/
 */
import {
	browserCaptureSdk,
	reactCaptureSdk,
} from "@/core/infrastructures/observabilities/index.js";
import { SENTRY_PUB_DSN } from "./constants.js";

function createScopedClient<
	SDK extends typeof browserCaptureSdk | typeof reactCaptureSdk,
>({
	sdk,
	tags,
}: {
	sdk: SDK;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	tags: Record<string, any>;
}) {
	const {
		BrowserClient,
		Scope,
		defaultStackParser,
		getDefaultIntegrations,
		makeFetchTransport,
	} = sdk;

	// filter integrations that use the global variable
	// https://docs.sentry.io/platforms/javascript/configuration/integrations/
	const integrations = getDefaultIntegrations({}).filter(
		(defaultIntegration) => {
			// logger.info("defaultIntegration", defaultIntegration);
			return !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(
				defaultIntegration.name,
			);
		},
	);

	const client = new BrowserClient({
		dsn: SENTRY_PUB_DSN,
		transport: makeFetchTransport,
		stackParser: defaultStackParser,
		integrations: integrations,
		release: browser.runtime.getManifest().version,
	});

	const scope = new Scope();

	scope.setClient(client);
	client.init(); // initializing has to be done after setting the client on the scope
	scope.setTags(tags);
	logger.debug(`${tags}scoped capture client instance created.`);

	return { client: scope } as const;
}

export const browserCaptureClient = createScopedClient({
	sdk: browserCaptureSdk,
	tags: { clientName: "browserCapture" },
}).client;

export const reactCaptureClient = createScopedClient({
	sdk: reactCaptureSdk,
	tags: { clientName: "reactCapture" },
}).client;

export { browserCaptureSdk, reactCaptureSdk };
