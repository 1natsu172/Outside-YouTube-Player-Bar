import { Settings } from "./components/Settings/Settings.js";
import { UIProvider } from "@/sharedUI/Provider/UIProvider.js";
import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

export const App = () => {
	return (
		<UIProvider>
			<Settings />
		</UIProvider>
	);
};
