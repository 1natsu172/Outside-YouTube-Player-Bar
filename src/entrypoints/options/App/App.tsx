import {
	TanstackQueryClientProvider,
	TanstackQueryErrorResetBoundary,
} from "@/sharedUI/Provider/TanstackQueryProvider.js";
import { UIProvider } from "@/sharedUI/Provider/UIProvider.js";
import "@mantine/core/styles.css";
import "./App.css";
import { Footer } from "./components/Footer/Footer.js";
import { Header } from "./components/Header/Header.js";
import { KoFi } from "./components/KoFi/KoFi.js";
import { Settings } from "./components/Settings/Settings.js";

export const App = () => {
	return (
		<UIProvider>
			<TanstackQueryClientProvider>
				<TanstackQueryErrorResetBoundary>
					<Header />
					<Settings />
					<KoFi />
					<Footer />
				</TanstackQueryErrorResetBoundary>
			</TanstackQueryClientProvider>
		</UIProvider>
	);
};
