/// <reference types="vite-plugin-svgr/client" />
import ToggleIcon from "@/public/images/oypb-toggle.svg?react";
import style from "./style.module.css";
import type { ExtensionBehavior } from "@/core/mains/extensionFeatures.js";
import type { SiteMetaState } from "@/core/mains/contentScriptState.js";

type P = {
	currentBarPosition: ExtensionBehavior["positionPlayerBar"];
	videoPlayerMode: SiteMetaState["videoPlayerState"]["mode"];
	tooltip: string;
	onToggle: () => void;
};

export const ToggleButton = (props: P) => {
	const { currentBarPosition, videoPlayerMode, tooltip, onToggle } = props;

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
				<ToggleIcon />
			</button>
			<span className={style.tooltip}>{tooltip}</span>
		</>
	);
};
