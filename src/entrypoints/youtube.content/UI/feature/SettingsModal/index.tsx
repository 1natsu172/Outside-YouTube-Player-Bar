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

/**
 *
 * @deprecated モーダルにするとShadowHostのDOMの領域のレイヤーに閉じ込められるため、実質全面モーダルにすることができない。回避策としてdocument.bodyにappendする形で親文書にモーダルコンポーネントを配置できるものの、そうするとCSSスタイルが親側にはないためスタイルが破綻してしまう。しかしスタイルの問題を回避するには親文書にスタイルを注入する必要が出てしまうため、親文書のCSSを壊してしまう可能性が出る。
 * 妥協案としてShadowHost（ビデオプレイヤーの要素）の矩形をobserveして、CSSvariableで管理してfixed要素を親領域に限定させる（ビデオプレイヤー内部モーダルとなる）という技もあるがhackなのでやらない。
 * ということでdeprecated.
 */
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
			>
				<SettingsContainer />
			</Dialog>
		</div>
	);
};
