import { elementQuery } from "@/core/mains/meta.js";
import { waitElement } from "@1natsu/wait-element";

export const waitMountUITarget = async (): Promise<Element> => {
	logger.debug("waiting for target of inject target");

	const playerBar = await waitElement(elementQuery.PLAYER_BAR);
	const rightControls = await waitElement(elementQuery.PLAYER_BAR_RIGHT_CTRL, {
		target: playerBar,
	});

	return rightControls;
};
