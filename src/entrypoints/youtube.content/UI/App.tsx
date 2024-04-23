import { useEffect } from "react";
import { PlayerBarButton } from "./feature/PlayerBarButton/index.js";
import "./App.css";

export const App = () => {
	useEffect(() => {
		logger.debug("I'm App");
	}, []);

	return <PlayerBarButton />;
};
