import {
	TanstackQueryClientProvider,
	TanstackQueryErrorResetBoundary,
} from "@/sharedUI/Provider/TanstackQueryProvider.js";
import { UIProvider } from "@/sharedUI/Provider/UIProvider.js";
import "@mantine/core/styles.css";
import "./App.css";
import { Settings } from "./components/Settings/Settings.js";

export const App = () => {
	return (
		<UIProvider>
			<TanstackQueryClientProvider>
				<TanstackQueryErrorResetBoundary>
					<Settings />
				</TanstackQueryErrorResetBoundary>
			</TanstackQueryClientProvider>
		</UIProvider>
	);
};
