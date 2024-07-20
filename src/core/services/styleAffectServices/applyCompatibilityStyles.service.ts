import { elementAttributes } from "@/core/mains/meta.js";
import { injectStyle } from "@/core/usecases/injectStyle.usecase.js";

let appliedFlag = false;

/**
 * Apply compatible styles to site.
 * '?inline'にすることでViteでcssのプロセスを通したものをJS上で非同期で扱える https://ja.vitejs.dev/guide/features#%E3%83%98%E3%82%9A%E3%83%BC%E3%82%B7%E3%82%99%E3%81%B8%E3%81%AE-css-%E6%B3%A8%E5%85%A5%E3%81%AE%E7%84%A1%E5%8A%B9%E5%8C%96
 */
export const applyCompatibilityStyles = async () => {
	if (appliedFlag) {
		logger.fatal("Already applied compat styles.");
		return;
	}

	const compatStyle = (
		await import(
			"@/core/mains/styles/compatibilityStyles/index.css?inline"
		).then((m) => {
			appliedFlag = true;
			return m;
		})
	).default;

	await injectStyle(compatStyle);

	logger.success("Side effect loaded compatibility styles.", compatStyle);
};

/**
 * Sync the movie-player classNames to compat elements. For style compatibility, e.g. scrubing-play function
 */
export function syncMoviePlayerAttributes({
	moviePlayerEl,
}: {
	moviePlayerEl: Element;
}) {
	const EXCLUDE_SYNC_CLASSNAMES = [
		"html5-video-player",
		"ytp-autohide",
		"ytp-autohide-active",
	];
	const { COMPAT_ELEMENT_PREFIX } = elementAttributes.oypb;
	const { PLAYER_BAR_PARENT } = elementAttributes.COMPAT_ELEMENT.VALUE;
	const compatEl = document.querySelector(
		`[${COMPAT_ELEMENT_PREFIX}=${PLAYER_BAR_PARENT}]`,
	);

	if (compatEl) {
		const syncClassNames = Array.from(moviePlayerEl.classList).filter(
			(className) => !EXCLUDE_SYNC_CLASSNAMES.includes(className),
		);
		const defferenceClassNames = Array.from(compatEl.classList).filter(
			(className) => !moviePlayerEl.classList.contains(className),
		);

		compatEl.classList.add(...syncClassNames);
		compatEl.classList.remove(...defferenceClassNames);
		logger.debug("movie-player classNames synced to compat element.");
	}
}
