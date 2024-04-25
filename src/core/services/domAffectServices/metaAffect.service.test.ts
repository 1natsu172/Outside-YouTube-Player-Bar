// @vitest-environment happy-dom

import { describe, test, expect, afterEach, vi } from "vitest";
import { documentElementAttr } from "./metaAffect.service.js";
import { elementAttributes } from "@/core/mains/meta.js";

const { oypb } = elementAttributes;

function cleanupDocumentElement() {
	const rootElm = document.documentElement;
	// Remove attributes on root element
	for (const attr of [...rootElm.attributes]) {
		rootElm.removeAttribute(attr.name);
	}
}

describe(documentElementAttr, () => {
	afterEach(() => {
		cleanupDocumentElement();
	});
	test("should set attr w/ value", () => {
		documentElementAttr(oypb.ENABLE).set("foo");

		const attr = document.documentElement.getAttributeNode(oypb.ENABLE);
		expect(attr?.name).toBe(oypb.ENABLE);
		expect(attr?.value).toBe("foo");
	});

	test("should set attr w/o value", () => {
		documentElementAttr(oypb.ENABLE).set();
		const attr = document.documentElement.hasAttribute(oypb.ENABLE);
		expect(attr).toBe(true);
	});

	test("should remove attr", () => {
		document.documentElement.setAttribute(oypb.ENABLE, "");
		expect(document.documentElement.hasAttribute(oypb.ENABLE)).toBe(true);
		documentElementAttr(oypb.ENABLE).remove();
		expect(document.documentElement.hasAttribute(oypb.ENABLE)).toBe(false);
	});
});
