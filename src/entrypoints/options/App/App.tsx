import { Settings } from "./components/Settings/Settings.js";
import { UIProvider } from "@/sharedUI/Provider/UIProvider.js";
import {
	TanstackQueryClientProvider,
	TanstackQueryErrorResetBoundary,
} from "@/sharedUI/Provider/TanstackQueryProvider.js";
import "./App.css";

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
