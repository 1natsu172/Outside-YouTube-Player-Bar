import {
	setDoneInitialize,
	setOypbEnable,
} from "@/core/usecases/operationState.usecase.js";

export const doneInitializeOperation = () => {
	setDoneInitialize(true);
};

export const oypbEnableOperation = (is: boolean) => {
	setOypbEnable(is);
};
