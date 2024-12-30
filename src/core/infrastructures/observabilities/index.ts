import type * as browserCaptureSdk from "@sentry/browser";
import type * as reactCaptureSdk from "@sentry/react";

export type SDK = typeof browserCaptureSdk | typeof reactCaptureSdk;

export * as browserCaptureSdk from "@sentry/browser";
export * as reactCaptureSdk from "@sentry/react";
