import { GlobalFooter } from "./components/globalFooter";
import { GlobalHeader } from "./components/globalHeader";
import { GlobalWrapper } from "./components/globalWrapper";
import { MainContents } from "./components/mainContent";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const Popup: React.FC<{}> = () => {
	return (
		<>
			<GlobalWrapper>
				<GlobalHeader />
				<MainContents />
				<GlobalFooter />
			</GlobalWrapper>
		</>
	);
};
