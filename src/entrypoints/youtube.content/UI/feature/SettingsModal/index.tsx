import { SettingsPanel } from "@/sharedUI/Components/panels/SettingsPanel/index.js";
import { useContext } from "react";
import {
	ModalStateContext,
	ModalHandlerContext,
} from "@/sharedUI/Provider/ModalProvider/index.js";

import { Dialog } from "primereact/dialog";

const SettingsContainer = () => {
	return (
		<div>
			<SettingsPanel />
		</div>
	);
};

export const SettingsModal = () => {
	const { isShow } = useContext(ModalStateContext);
	const { onClose } = useContext(ModalHandlerContext);

	return (
		<div className="card flex justify-content-center">
			<Dialog
				header="Header"
				visible={isShow}
				onHide={onClose}
				style={{ width: "80vw" }}
				maximizable
				dismissableMask
				// content={() => {
				// 	return (
				// 		<>
				// 		</>
				// 	);
				// }}
			>
				<SettingsContainer />
			</Dialog>
		</div>
	);
};
