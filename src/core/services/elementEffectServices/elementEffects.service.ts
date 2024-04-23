import { waitElement } from "@1natsu/wait-element";
import { debounce } from "mabiki";
import { setPlayerBarHeightVar } from "@/core/usecases/cssVariables.usecase.js";
import { elementQuery } from "@/core/mains/meta.js";
import { createBlockAutohideFn } from "@/core/services/behaviorServices/alwaysDisplayPlayerBar.service.js";

const moviePlayerElementEffect = async () => {
	const element = await waitElement(elementQuery.MOVIE_PLAYER);
	const blockAutoHide = createBlockAutohideFn(element);
	const debounceBlockAutohide = debounce(blockAutoHide, 1000, {
		trailing: true,
		leading: true,
	});

	const observer = new MutationObserver(
		debounce(
			(mutations) => {
				logger.debug("moviePlayerElement", "Observing effect has occurred.");

				for (const mutation of mutations) {
					// const targetClassList = (mutation.target as HTMLElement).classList;
					// const isVisiblePlayerBar =
					// 	targetClassList.contains("paused-mode") ||
					// 	!targetClassList.contains("ytp-autohide");
					// logger.silent("mutation", isVisiblePlayerBar);
					// logger.silent("mutation is", mutation);
					// TODO: v4でもvisible状態を監視する必要があれば継続、なければ消す
					// if (isVisiblePlayerBar) {
					// 	interventionDOM.addVisiblePlayerBarClassName();
					// }
					// NOTE: activeかつ常時表示かつプレイヤーバーが非表示のとき、autohideの場合があるので解除を試みる
					// TODO: if条件ちゃんと実装する（オプションも含めて）
					// if (isActive() && isAlwaysDisplayPlayerBar() && !isVisiblePlayerBar) {
					// 	mutationProps.blockAutohide();
					// }
				}
			},
			1000,
			{
				trailing: true,
				leading: true,
			},
		),
	);
	observer.observe(element, {
		attributes: true, // check only attributes
		attributeFilter: ["class"], // check only className attribute
	});
	return observer;
};

const playerBarElementEffect = async () => {
	const element = await waitElement(elementQuery.PLAYER_BAR);
	// const debounceSetPlayerBarHeightVar = debounce(setPlayerBarHeightVar, 500, {
	// 	trailing: true,
	// 	leading: true,
	// });

	const observer = new ResizeObserver(
		debounce(
			(entries) => {
				logger.debug("playerBarElement", "Observing effect has occurred.");
				for (const entry of entries) {
					const { borderBoxSize } = entry;

					const [size] = borderBoxSize;
					const height = `${size.blockSize}px`;
					setPlayerBarHeightVar(height);
				}
			},
			500,
			{
				trailing: true,
				leading: true,
			},
		),
	);
	observer.observe(element, {
		box: "border-box",
	});
	return observer;
};

///////////////////////////////////////////
export const setupElementEffects = async () => {
	const effects = await Promise.all<ResizeObserver | MutationObserver>([
		playerBarElementEffect(),
		moviePlayerElementEffect(),
	]);
	return effects;
};
