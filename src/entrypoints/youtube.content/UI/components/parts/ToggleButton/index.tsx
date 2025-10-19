import { IconTransitionBottom, IconTransitionTop } from "@tabler/icons-react";
import { useId, useMemo } from "react";
import type { VideoPlayerMode } from "@/core/mains/contentScriptState.js";
import type { ExtensionBehavior } from "@/core/mains/extensionFeatures.js";
import { NotificationCircle } from "@/sharedUI/Components/parts/NotificationCircle/index.js";
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

	const id = useId();

	return (
		<>
			<button
				type="button"
				id={id}
				className={`${style.button}`}
				data-id="oypb-toggle-button"
				data-current-bar-position={currentBarPosition}
				data-video-player-mode={videoPlayerMode}
				onClick={onToggle}
			>
				<ToggleIcon stroke={2.5} color="var(--oypb-player-bar-icon-color)" />
			</button>
			<span className={style.tooltip} data-video-player-mode={videoPlayerMode}>
				{tooltip}
			</span>
			{showUpdateRed && (
				<span className={style.notificationCircle}>
					<NotificationCircle />
				</span>
			)}
		</>
	);
};
