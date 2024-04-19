import { logger } from "@/utils/logger.js";
import { waitElement } from "@1natsu/wait-element";

export const waitMountUITarget = async (): Promise<Element> => {
	logger.log("waiting for target of inject target");

	const playerBar = await waitElement(".ytp-chrome-bottom");
	const rightControls = await waitElement(".ytp-right-controls", {
		target: playerBar,
	});

	return rightControls;
};
