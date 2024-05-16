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

			element.addEventListener(eventKey, effectFn, {
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
