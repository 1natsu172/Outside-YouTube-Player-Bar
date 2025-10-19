/**
 * NOTE: Browser extension capture must be scoped.
 * ref: https://docs.sentry.io/platforms/javascript/best-practices/shared-environments/
 * FIXME(future): rollupがdestructuringのtree-shakingに対応していない＆複数のSDKをimportしてclient生成を抽象化しているためnamed-importもしにくい。そのため必要なプロパティを型定義してSDKに対してプロパティアクセスする冗長な実装になってしまっている。事の発端は`lazyLoadIntegration`のためのコードがバンドル成果物に入り込み審査時にremote-codeにみなされるためtree-shakingが必須になったことに由来している。 https://github.com/getsentry/sentry-javascript/issues/14010
 * * rollupが賢くなったら冗長な実装を剥がしたい。
 */

import type { Integration } from "@sentry/core";
import defu from "defu";
import {
	browserCaptureSdk,
	reactCaptureSdk,
	type SDK,
} from "@/core/infrastructures/observabilities/index.js";
import { isMatchingPhrasePattern } from "@/utils/validateUtils/matchPattern.js";
import { ignoreErrors, SENTRY_PUB_DSN } from "./constants.js";

function createScopedClient<_SDK extends SDK>({
	sdkApi,
	tags,
	options,
}: {
	sdkApi: {
		BrowserClient: _SDK["BrowserClient"];
		Scope: _SDK["Scope"];
		defaultStackParser: _SDK["defaultStackParser"];
		getDefaultIntegrations: _SDK["getDefaultIntegrations"];
		makeFetchTransport: _SDK["makeFetchTransport"];
	};
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
	} = sdkApi;

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
	sdkApi: {
		BrowserClient: browserCaptureSdk.BrowserClient,
		Scope: browserCaptureSdk.Scope,
		defaultStackParser: browserCaptureSdk.defaultStackParser,
		getDefaultIntegrations: browserCaptureSdk.getDefaultIntegrations,
		makeFetchTransport: browserCaptureSdk.makeFetchTransport,
	},
	tags: { clientName: "browserCapture" },
});

export const reactCaptureClientRepo = createCaptureClientRepo({
	sdkApi: {
		BrowserClient: reactCaptureSdk.BrowserClient,
		Scope: reactCaptureSdk.Scope,
		defaultStackParser: reactCaptureSdk.defaultStackParser,
		getDefaultIntegrations: reactCaptureSdk.getDefaultIntegrations,
		makeFetchTransport: reactCaptureSdk.makeFetchTransport,
	},
	tags: { clientName: "reactCapture" },
});

export const serviceWorkerCaptureClientRepo = createCaptureClientRepo({
	sdkApi: {
		BrowserClient: browserCaptureSdk.BrowserClient,
		Scope: browserCaptureSdk.Scope,
		defaultStackParser: browserCaptureSdk.defaultStackParser,
		getDefaultIntegrations: browserCaptureSdk.getDefaultIntegrations,
		makeFetchTransport: browserCaptureSdk.makeFetchTransport,
	},
	tags: { clientName: "serviceWorkerCapture" },
});
