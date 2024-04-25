import type { elementAttributes } from "@/core/mains/meta.js";
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
