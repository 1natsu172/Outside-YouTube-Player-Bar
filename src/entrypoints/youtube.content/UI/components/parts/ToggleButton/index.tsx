/// <reference types="vite-plugin-svgr/client" />
import ToggleIcon from "@/public/images/oypb-toggle.svg?react";
import style from "./style.module.css";
import type { ExtensionBehavior } from "@/core/mains/extensionFeatures.js";
import type { ContentScriptState } from "@/core/mains/contentScriptState.js";

type P = {
	currentBarPosition: ExtensionBehavior["positionPlayerBar"];
	videoPlayerMode: ContentScriptState["siteMeta"]["videoPlayerMode"];
	tooltip: string;
};

export const ToggleButton = (props: P) => {
	const { currentBarPosition, videoPlayerMode, tooltip } = props;

	return (
		<>
			<button
				type="button"
				id="oypb-toggle-button"
				className={`${style.button}`}
				data-current-bar-position={currentBarPosition}
				data-video-player-mode={videoPlayerMode}
			>
				<ToggleIcon />
			</button>
			<span className={style.tooltip}>{tooltip}</span>
		</>
	);
};
