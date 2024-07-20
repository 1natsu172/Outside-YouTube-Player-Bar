import { NotificationCircle } from "@/sharedUI/Components/parts/NotificationCircle/index.js";
import { IconPuzzleOff } from "@tabler/icons-react";
import style from "./style.module.css";

type P = {
	tooltip: string;
	showUpdateRed: boolean;
	openSettings: () => Promise<void>;
};
export const ForceDisablingButton = (props: P) => {
	const { tooltip, showUpdateRed, openSettings } = props;

	return (
		<>
			<button
				type="button"
				className={`${style.button}`}
				onClick={openSettings}
			>
				<IconPuzzleOff strokeWidth={2.5} color="#fff" />
			</button>
			<span className={style.tooltip}>{tooltip}</span>
			{showUpdateRed && (
				<span className={style.notificationCircle}>
					<NotificationCircle />
				</span>
			)}
		</>
	);
};
