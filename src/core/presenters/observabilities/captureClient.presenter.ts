import {
	browserCaptureClientRepo,
	reactCaptureClientRepo,
	serviceWorkerCaptureClientRepo,
} from "@/core/repositories/observabilities/captureClient.repository.js";

export const browserCaptureClient = browserCaptureClientRepo.client;
export const browserCaptureSdk = browserCaptureClientRepo.sdk;
export const reactCaptureClient = reactCaptureClientRepo.client;
export const reactCaptureSdk = reactCaptureClientRepo.sdk;
export const serviceWorkerCaptureClient = serviceWorkerCaptureClientRepo.client;
export const serviceWorkerCaptureSdk = serviceWorkerCaptureClientRepo.sdk;

export type CaptureClient =
	| typeof browserCaptureClient
	| typeof reactCaptureClient
	| typeof serviceWorkerCaptureClient;
