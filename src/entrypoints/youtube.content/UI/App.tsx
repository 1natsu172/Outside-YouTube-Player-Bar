import { TanstackQueryClientProvider } from "@/sharedUI/Provider/TanstackQueryProvider.js";
import {
	UIProvider,
	type UIProviderConfig,
} from "@/sharedUI/Provider/UIProvider.js";
import { useEffect } from "react";
import "./App.css";
import { ErrorBoundary } from "@/sharedUI/libs/ErrorBoundary.js";
import { PlayerBarButton } from "./feature/PlayerBarButton/index.js";

const uiProviderConfig: UIProviderConfig = {};

export const App = () => {
	useEffect(() => {
		logger.debug("I'm UI App");
	}, []);

	return (
		<UIProvider config={uiProviderConfig}>
			<TanstackQueryClientProvider>
				<ErrorBoundary>
					<PlayerBarButton />
				</ErrorBoundary>
			</TanstackQueryClientProvider>
		</UIProvider>
	);
};
