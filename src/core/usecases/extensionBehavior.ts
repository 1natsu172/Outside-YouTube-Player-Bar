import state from "../infrastructures/stateMap";

export const setHasInjected = (is: boolean) => {
	state.set("hasInjected", is);
};

export const setIsActive = (is: boolean) => {
	state.set("isActive", is);
};

export const setIsAlwaysDisplayPlayerBar = (is: boolean) => {
	state.set("isAlwaysDisplayPlayerBar", is);
};

export const setForceDisplayPlayerBarIntervalId = (
	id: number | NodeJS.Timer,
) => {
	state.set("forceDisplayPlayerBarIntervalId", id);
};
