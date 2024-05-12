import {
	UIProvider,
	type UIProviderConfig,
} from "@/sharedUI/Provider/UIProvider.js";
import { PlayerBarButton } from "./feature/PlayerBarButton/index.js";
import "./App.css";
import { useEffect } from "react";

const uiProviderConfig: UIProviderConfig = {};

export const App = () => {
	useEffect(() => {
		logger.debug("I'm UI App");
	}, []);

	return (
		<UIProvider config={uiProviderConfig}>
			<PlayerBarButton />
		</UIProvider>
	);
};
