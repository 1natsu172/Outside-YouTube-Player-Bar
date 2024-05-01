import {
	UIProvider,
	type UIProviderConfig,
} from "@/sharedUI/Provider/UIProvider.js";
import { ModalProvider } from "@/sharedUI/Provider/ModalProvider/index.js";
import { PlayerBarButton } from "./feature/PlayerBarButton/index.js";
import { SettingsModal } from "./feature/SettingsModal/index.js";
import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Suspense, useEffect } from "react";

const uiProviderConfig: UIProviderConfig = {
	appendTo: "self", // NOTE: UI styles need inject to shadow-root. Do not let the style affect the raw DOM.
};

export const App = () => {
	useEffect(() => {
		logger.debug("I'm App");
	}, []);

	return (
		<UIProvider config={uiProviderConfig}>
			<ModalProvider>
				<PlayerBarButton />
				<SettingsModal />
			</ModalProvider>
		</UIProvider>
	);
};
