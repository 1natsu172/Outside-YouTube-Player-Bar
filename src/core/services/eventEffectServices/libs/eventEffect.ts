import { browserCaptureClient } from "@/core/presenters/observabilities/captureClient.presenter.js";

type EffectFn = EventListenerOrEventListenerObject;

export class EventEffect {
	constructor(
		public eventKeys: string[],
		public effectFn: (key: string) => EffectFn,
		public listenerOptions?: {
			targetElement?: Element;
			addEventListenerOption?: AddEventListenerOptions;
		},
	) {}

	private abortController = new AbortController();

	observe() {
		const element = this.listenerOptions?.targetElement ?? document;
		for (const eventKey of this.eventKeys) {
			const effectFn = this.effectFn(eventKey);
			const _effectFn = (event: Event) => {
				try {
					if (typeof effectFn === "function") {
						effectFn(event);
					}
				} catch (error) {
					// NOTE: Do not intentionally re-throw error(prevent this: https://i.gyazo.com/46827a796bf1ffea3e9554769619f88e.png)
					browserCaptureClient.captureException(error);
				}
			};

			element.addEventListener(eventKey, _effectFn, {
				...this.listenerOptions?.addEventListenerOption,
				signal: this.abortController.signal,
			});
		}
		return this;
	}
	dispose() {
		this.abortController.abort();
	}
}

export const createEventEffect = (
	...args: ConstructorParameters<typeof EventEffect>
) => {
	return new EventEffect(...args);
};
