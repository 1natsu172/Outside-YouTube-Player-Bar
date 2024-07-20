import type { VideoPlayerMode } from "@/core/mains/contentScriptState.js";
import { IconSettings } from "@tabler/icons-react";
import style from "./style.module.css";

type P = {
	tooltip: string;
	openSettings: () => Promise<void>;
	videoPlayerMode: VideoPlayerMode;
};
export const SettingsButton = (props: P) => {
	const { tooltip, openSettings, videoPlayerMode } = props;

	return (
		<>
			<button
				type="button"
				className={`${style.button}`}
				onClick={openSettings}
			>
				<IconSettings
					strokeWidth={2.5}
					color="var(--oypb-player-bar-icon-color)"
				/>
			</button>
			<span className={style.tooltip} data-video-player-mode={videoPlayerMode}>
				{tooltip}
			</span>
		</>
	);
};
