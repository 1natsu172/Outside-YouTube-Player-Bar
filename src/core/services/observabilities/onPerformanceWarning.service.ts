import { browserCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";

export class OnPerformanceWarning {
	constructor() {
		logger.debug(
			"Is this browser support the runtime.onPerformanceWarning?",
			// @ts-expect-error
			browser.runtime?.onPerformanceWarning,
		);
	}

	// biome-ignore lint/suspicious/noExplicitAny: FIXME: Firefoxしかないので型が不足している
	public listener(details: any) {
		browserCaptureClient.captureMessage(
			"ON_PERFORMANCE_WARNING CAPTURED",
			"warning",
			{ captureContext: { extra: { details } } },
		);
	}

	public observe() {
		// @ts-expect-error
		if (browser.runtime.onPerformanceWarning) {
			// @ts-expect-error
			browser.runtime.onPerformanceWarning.addListener(this.listener);
			logger.debug("Observed onPerformanceWarning.");
		}
		return this;
	}

	public dispose() {
		// @ts-expect-error
		if (browser.runtime.onPerformanceWarning) {
			// @ts-expect-error
			if (browser.runtime.onPerformanceWarning.hasListener(this.listener)) {
				// @ts-expect-error
				browser.runtime.onPerformanceWarning.removeListener(this.listener);
				logger.debug("Disposed onPerformanceWarning.");
			}
		}
	}
}

export const performanceWarningObserver = () => {
	return new OnPerformanceWarning();
};
