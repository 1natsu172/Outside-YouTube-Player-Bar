import {
	type OnPerformanceWarning,
	performanceWarningObserver,
} from "./onPerformanceWarning.service.js";

export type ObservabilityObserver = OnPerformanceWarning;

export const setupObservabilityObservers = async () => {
	const observers = await Promise.all<ObservabilityObserver>([
		performanceWarningObserver().observe(),
	]);
	return observers;
};
