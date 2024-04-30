// import { UIProvider } from "@/sharedUI/Provider/UIProvider.js";
import { ModalProvider } from "@/sharedUI/Provider/ModalProvider/index.js";
import { PlayerBarButton } from "./feature/PlayerBarButton/index.js";
import { SettingsModal } from "./feature/SettingsModal/index.js";
import "./App.css";
import { Suspense, useEffect } from "react";

export const App = () => {
	useEffect(() => {
		logger.debug("I'm App");
	}, []);

	return (
		<ModalProvider>
			<PlayerBarButton />
			<Suspense>
				<SettingsModal />
			</Suspense>
		</ModalProvider>
	);
};
