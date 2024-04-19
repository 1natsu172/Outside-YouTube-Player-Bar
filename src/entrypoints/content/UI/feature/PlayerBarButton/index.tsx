import { OypbButton } from "../../components/parts/OypbButton/index.js";
import style from "./style.module.css";

// type Props = { children?: JSX.Element }
export const PlayerBarButton = () => {
	return (
		<div className={style["player-bar-button"]}>
			<OypbButton />
		</div>
	);
};
