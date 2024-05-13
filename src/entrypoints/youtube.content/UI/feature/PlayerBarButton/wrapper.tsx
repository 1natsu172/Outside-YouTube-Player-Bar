import { TanstackQueryErrorResetBoundary } from "@/sharedUI/Provider/TanstackQueryProvider.js";
import { Suspense, type ReactNode } from "react";
import style from "./style.module.css";
import { IconRefreshAlert } from "@tabler/icons-react";
import { LoadingSpinner } from "@/sharedUI/Components/parts/LoadingSpinner/index.js";

type P = {
	children?: ReactNode;
};

export const PlayerBarButtonWrapper = ({ children }: P) => {
	return (
		<div className={style["player-bar-button-wrapper"]}>
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
