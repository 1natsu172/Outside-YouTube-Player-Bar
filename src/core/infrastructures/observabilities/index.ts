import * as SentryBrowser from "@sentry/browser";
import * as SentryReact from "@sentry/react";
export const browserCaptureSdk = SentryBrowser;
export const reactCaptureSdk = SentryReact;

export type SDK = typeof browserCaptureSdk | typeof reactCaptureSdk;
