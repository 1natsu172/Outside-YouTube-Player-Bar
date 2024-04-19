const state = new Map<StateKey, unknown>();
export default state;

export type StateMap = {
	hasInjected: boolean;
	isActive: boolean;
	isAlwaysDisplayPlayerBar: boolean;
	forceDisplayPlayerBarIntervalId: number | NodeJS.Timer | undefined;
};

export type StateKey = keyof StateMap;
