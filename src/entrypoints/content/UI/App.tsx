import { useEffect } from "react";
import { PlayerBarButton } from "./feature/PlayerBarButton/index.js";

export const App = () => {
	useEffect(() => {
		logger.log("I'm App");
	}, []);

	return <PlayerBarButton />;
};
