import {
	TanstackQueryClientProvider,
	TanstackQueryErrorResetBoundary,
} from "@/sharedUI/Provider/TanstackQueryProvider.js";
import { UIProvider } from "@/sharedUI/Provider/UIProvider.js";
import "@mantine/core/styles.css";
import "./App.css";
import { ErrorBoundary } from "@/sharedUI/libs/ErrorBoundary.js";
import { ErrorReport } from "./components/ErrorReport/ErrorReport.js";
import { Footer } from "./components/Footer/Footer.js";
import { Header } from "./components/Header/Header.js";
import { KoFi } from "./components/KoFi/KoFi.js";
import { Settings } from "./components/Settings/Settings.js";

export const App = () => {
	return (
		<UIProvider>
			<TanstackQueryClientProvider>
				<ErrorBoundary>
					<TanstackQueryErrorResetBoundary>
						<Header />
						<Settings />
						<ErrorReport />
						<KoFi />
						<Footer />
					</TanstackQueryErrorResetBoundary>
				</ErrorBoundary>
			</TanstackQueryClientProvider>
		</UIProvider>
	);
};
