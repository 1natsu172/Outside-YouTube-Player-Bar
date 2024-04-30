import { createPortal } from "react-dom";
import { SettingsPanel } from "@/sharedUI/Components/panels/SettingsPanel/index.js";
import { useContext, useEffect, useState } from "react";
import { ModalStateContext } from "@/sharedUI/Provider/ModalProvider/index.js";
import { waitElement } from "@1natsu/wait-element";
import { elementQuery } from "@/core/mains/meta.js";

export const SettingsModal = () => {
	const [containerElement, setContainerElement] = useState<Element | null>(
		null,
	);

	useEffect(() => {
		waitElement(elementQuery.YTD_APP_CONTAINER).then((el) =>
			setContainerElement(el),
		);
	}, []);

	const { isShow } = useContext(ModalStateContext);

	return isShow && containerElement
		? createPortal(<SettingsPanel />, containerElement)
		: null;
};
