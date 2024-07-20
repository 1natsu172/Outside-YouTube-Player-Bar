import { useVideoPlayerMode } from "@/core/presenters/statePresenter/siteMetaState/index.js";
import { LoadingSpinner } from "@/sharedUI/Components/parts/LoadingSpinner/index.js";
import { TanstackQueryErrorResetBoundary } from "@/sharedUI/Provider/TanstackQueryProvider.js";
import { IconRefreshAlert } from "@tabler/icons-react";
import { type ReactNode, Suspense } from "react";
import style from "./style.module.css";

type P = {
	children?: ReactNode;
};

export const PlayerBarButtonWrapper = ({ children }: P) => {
	const videoPlayerMode = useVideoPlayerMode();

	return (
		<div
			className={style["player-bar-button-wrapper"]}
			data-video-player-mode={videoPlayerMode}
		>
			<TanstackQueryErrorResetBoundary
				fallbackRender={({ resetErrorBoundary }) => (
					<IconRefreshAlert onClick={resetErrorBoundary} />
				)}
			>
				<Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
			</TanstackQueryErrorResetBoundary>
		</div>
	);
};
