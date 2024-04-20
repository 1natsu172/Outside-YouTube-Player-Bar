import { behaviorState } from "@/core/repositories/contentScript.repository.js";

// TODO
export const useExtenstionBehavior = () => {
	behaviorState.getValue();
};

// todo
export const useBarPosition = (): "outside" | "inside" => {
	return "outside" as const;
	// return extensionBehavior.getValue().barPosition
};
