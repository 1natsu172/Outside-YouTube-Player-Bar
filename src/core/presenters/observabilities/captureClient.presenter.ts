import {
	browserCaptureClientRepo,
	reactCaptureClientRepo,
	serviceWorkerCaptureClientRepo,
} from "@/core/repositories/observabilities/captureClient.repository.js";

export const browserCaptureClient = browserCaptureClientRepo;
export const reactCaptureClient = reactCaptureClientRepo;
export const serviceWorkerCaptureClient = serviceWorkerCaptureClientRepo;

export type CaptureClient =
	| typeof browserCaptureClient
	| typeof reactCaptureClient
	| typeof serviceWorkerCaptureClient;
