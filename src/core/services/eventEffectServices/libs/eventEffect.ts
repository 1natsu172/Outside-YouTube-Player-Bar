type EffectFn = EventListenerOrEventListenerObject;

export class EventEffect {
	constructor(
		public eventKeys: string[],
		public effectFn: (key: string) => EffectFn,
	) {}

	observe() {
		for (const eventKey of this.eventKeys) {
			const effectFn = this.effectFn(eventKey);
			document.addEventListener(eventKey, effectFn);
		}
		return this;
	}
	dispose() {
		for (const eventKey of this.eventKeys) {
			const effectFn = this.effectFn(eventKey);
			document.removeEventListener(eventKey, effectFn);
		}
	}
}

export const createEventEffect = (
	...args: ConstructorParameters<typeof EventEffect>
) => {
	return new EventEffect(...args);
};
