/**
 * @description Manager for consistency between central storage and states.
 */
export const stateConsistencyManager = () => {}; // TODO: valtioとつなぐ reactiveに状態に一貫性をもたせる実装。

// TODO: これ本当に必要？
import { derive } from "derive-valtio";
import { currentBehaviorState } from "@/core/repositories/contentScript.repository.js";

const storageValues = derive({
	userOption: (get) => repo.getValue(),
});
