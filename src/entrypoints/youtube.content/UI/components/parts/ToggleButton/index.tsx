import type { VideoPlayerMode } from "@/core/mains/contentScriptState.js";
import type { ExtensionBehavior } from "@/core/mains/extensionFeatures.js";
import { NotificationCircle } from "@/sharedUI/Components/parts/NotificationCircle/index.js";
import { IconTransitionBottom, IconTransitionTop } from "@tabler/icons-react";
import { useMemo } from "react";
import style from "./style.module.css";

type P = {
	currentBarPosition: ExtensionBehavior["positionPlayerBar"];
	videoPlayerMode: VideoPlayerMode;
	tooltip: string;
	showUpdateRed: boolean;
	onToggle: () => void;
};

export const ToggleButton = (props: P) => {
	const {
		currentBarPosition,
		videoPlayerMode,
		tooltip,
		showUpdateRed,
		onToggle,
	} = props;

	const ToggleIcon = useMemo(
		() =>
			currentBarPosition === "inside"
				? IconTransitionBottom
				: IconTransitionTop,
		[currentBarPosition],
	);

	return (
		<>
			<button
				type="button"
				id="oypb-toggle-button"
				className={`${style.button}`}
				data-current-bar-position={currentBarPosition}
				data-video-player-mode={videoPlayerMode}
				onClick={onToggle}
			>
				<ToggleIcon stroke={2.5} color="var(--oypb-player-bar-icon-color)" />
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
