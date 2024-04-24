import { elementAttributes } from "@/core/mains/meta.js";

// TODO:
export const affectEnableAttr = (remove = false) => {
	if (remove) {
		document.documentElement.removeAttribute(elementAttributes.oypb.ENABLE);
	} else {
		document.documentElement.setAttribute(
			elementAttributes.oypb.ENABLE,
			"true",
		);
	}
};

export const affectIsOutsideAttr = (remove = false) => {
	if (remove) {
		document.documentElement.removeAttribute(elementAttributes.oypb.IS_OUTSIDE);
	} else {
		document.documentElement.setAttribute(
			elementAttributes.oypb.IS_OUTSIDE,
			"true",
		);
	}
};
