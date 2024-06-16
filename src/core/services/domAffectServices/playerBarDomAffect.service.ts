import type {
	BehaviorState,
	VideoPlayerMode,
} from "@/core/mains/contentScriptState.js";
import { elementAttributes, elementQuery } from "@/core/mains/meta.js";
import type { NonUndefined } from "@/utils/typeUtils.js";
import { waitElement } from "@1natsu/wait-element";
import { documentElementAttr } from "./domMetaAffect.service.js";

/**
 * @param InsertPosition that see reference (https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement)
 */
type InsertInfo<Q extends string | undefined> = Q extends undefined
	? [undefined, undefined]
	: [Q, NonUndefined<InsertPosition>];

/**
 * From the playerbar's POV
 */
type ElementQueryMap<Q extends string | undefined> = {
	playerBar: string;
	parentElement: InsertInfo<Q>;
	siblingElement: InsertInfo<Q>;
	needCompatParentElement: boolean;
};
type ElementQueries<Q extends string | undefined = string | undefined> = Record<
	VideoPlayerMode,
	{
		/**
		 * "inside" means "origin"
		 */
		inside: ElementQueryMap<Q>;
		outside: ElementQueryMap<Q>;
	}
>;

function __resolveMoveLogic<Q extends string | undefined>(
	elementQueryMap: ElementQueryMap<Q>,
): () => Promise<Element | null> {
	const __createInsertElementFn = (
		barQuery: string,
		insertInfo: InsertInfo<string>,
		needCompatParentElement: boolean,
	): (() => Promise<Element | null>) => {
		return async () => {
			const [targetQuery, position] = insertInfo;
			const { COMPAT_ELEMENT_PREFIX } = elementAttributes.oypb;
			const { PLAYER_BAR_PARENT } = elementAttributes.COMPAT_ELEMENT.VALUE;
			const COMPAT_ELEMENT_DATA_VALUE = PLAYER_BAR_PARENT;
			const existCompatParent = document.querySelector(
				`[${COMPAT_ELEMENT_PREFIX}=${COMPAT_ELEMENT_DATA_VALUE}]`,
			);

			const pureBarEl = await waitElement(barQuery);
			let barEl: Element = pureBarEl;
			if (needCompatParentElement) {
				if (existCompatParent) {
					// NOTE: プレイヤーモードを切り替えるたびにCompatParentが増殖していくので都度消す。barElはDOM上から一瞬消えるが、pureBarEl変数で参照保存されているためGCされないゆえに後続のinsertAdjacentElementでDOMに再挿入できる。
					existCompatParent.remove();
				}
				const compatParent = document.createElement("div");
				compatParent.setAttribute(
					COMPAT_ELEMENT_PREFIX,
					COMPAT_ELEMENT_DATA_VALUE,
				);

				compatParent.appendChild(pureBarEl);
				barEl = compatParent;
			}

			const targetEl = await waitElement(targetQuery);
			const result = targetEl.insertAdjacentElement(position, barEl);
			logger.debug("moved playerBar element.", {
				insertInfo,
				needCompatParentElement,
				targetEl,
				barEl,
				result,
			});
			return result;
		};
	};

	const { playerBar, parentElement, siblingElement, needCompatParentElement } =
		elementQueryMap;
	switch (true) {
		case !!parentElement[0]: {
			return __createInsertElementFn(
				playerBar,
				parentElement,
				needCompatParentElement,
			);
		}
		case !!siblingElement[0]: {
			return __createInsertElementFn(
				playerBar,
				siblingElement,
				needCompatParentElement,
			);
		}
		default: {
			return async () => {
				logger.warn("This log that should never be reached!", elementQueryMap);
				return null;
			};
		}
	}
}

/**
 * @description Focus on moving Elements. This function is only called on request.
 */
export const movePlayerBarElement = async (props: {
	direction: BehaviorState["positionPlayerBar"];
	playerMode: VideoPlayerMode;
}) => {
	const { direction, playerMode } = props;
	const query = {
		defaultView: {
			inside: {
				playerBar: elementQuery.PLAYER_BAR,
				parentElement: [elementQuery.MOVIE_PLAYER, "beforeend"],
				siblingElement: [
					`${elementQuery.MOVIE_PLAYER} > div.ytp-gradient-bottom`,
					"afterend",
				],
				needCompatParentElement: false,
			},
			outside: {
				playerBar: elementQuery.PLAYER_BAR,
				parentElement: ["#player.ytd-watch-flexy", "beforeend"],
				siblingElement: [undefined, undefined],
				needCompatParentElement: true,
			},
		},
		theaterMode: {
			inside: {
				playerBar: elementQuery.PLAYER_BAR,
				parentElement: [elementQuery.MOVIE_PLAYER, "beforeend"],
				siblingElement: [
					`${elementQuery.MOVIE_PLAYER} > div.ytp-gradient-bottom`,
					"afterend",
				],
				needCompatParentElement: false,
			},
			outside: {
				playerBar: elementQuery.PLAYER_BAR,
				parentElement: [undefined, undefined],
				siblingElement: ["#full-bleed-container.ytd-watch-flexy", "afterend"], // theater container is island element, so must move to sibling
				needCompatParentElement: true,
			},
		},
		fullscreen: {
			inside: {
				playerBar: elementQuery.PLAYER_BAR,
				parentElement: [elementQuery.MOVIE_PLAYER, "beforeend"],
				siblingElement: [
					`${elementQuery.MOVIE_PLAYER} > div.ytp-gradient-bottom`,
					"afterend",
				],
				needCompatParentElement: false,
			},
			outside: {
				playerBar: elementQuery.PLAYER_BAR,
				parentElement: [undefined, undefined],
				siblingElement: ["#full-bleed-container.ytd-watch-flexy", "afterend"], // theater container is island element, so must move to sibling
				needCompatParentElement: true,
			},
		},
		none: {
			inside: {
				playerBar: "",
				parentElement: [undefined, undefined],
				siblingElement: [undefined, undefined],
				needCompatParentElement: false,
			},
			outside: {
				playerBar: "",
				parentElement: [undefined, undefined],
				siblingElement: [undefined, undefined],
				needCompatParentElement: false,
			},
		},
	} as const satisfies ElementQueries;

	const execMove = async (
		playerMode: (typeof props)["playerMode"],
		direction: (typeof props)["direction"],
	) => {
		const queryMap = query[playerMode][direction];
		const exec = __resolveMoveLogic(queryMap);
		return await exec();
	};

	const execAttr = documentElementAttr(elementAttributes.oypb.IS_OUTSIDE);

	const movedElement = await execMove(playerMode, direction);
	movedElement && direction === "outside" ? execAttr.set() : execAttr.remove();
};
