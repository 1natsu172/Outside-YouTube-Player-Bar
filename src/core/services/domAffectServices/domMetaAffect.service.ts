import type { OperationState } from "@/core/mains/contentScriptState.js";
import { elementAttributes } from "@/core/mains/meta.js";
import type { NestedValueOf } from "@/utils/typeUtils.js";

export const documentElementAttr = (
	qualifiedName: NestedValueOf<typeof elementAttributes>,
) => {
	return {
		set(value?: string) {
			document.documentElement.setAttribute(qualifiedName, value ?? "");
		},
		remove() {
			document.documentElement.removeAttribute(qualifiedName);
		},
	};
};

export const domAffectOypbEnable = (
	enable: OperationState["flagOps"]["oypbEnable"],
) => {
	const attr = documentElementAttr(elementAttributes.oypb.ENABLE);
	if (enable) {
		attr.set();
	} else {
		attr.remove();
	}
};
