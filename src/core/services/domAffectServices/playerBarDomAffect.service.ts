import { elementAttributes, elementQuery } from "@/core/mains/meta.js";
import { waitElement } from "@1natsu/wait-element";
import type { ContentScriptState } from "@/core/mains/contentScriptState.js";
import type { NonUndefined } from "@/utils/typeUtils.js";
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
	ContentScriptState["siteMeta"]["videoPlayerMode"],
	{
		/**
		 * "inside" means "origin"
		 */
		inside: ElementQueryMap<Q>;
		outside: ElementQueryMap<Q>;
	}
>;

function __resolveAdjacentElement<Q extends string | undefined>(
	elementQueryMap: ElementQueryMap<Q>,
): () => Promise<Element | null> {
	const __createInsertElementFn = (
		barQuery: string,
		insertInfo: InsertInfo<string>,
		needCompatParentElement: boolean,
	): (() => Promise<Element | null>) => {
		return async () => {
			logger.debug("__resolveAdjacentElement", {
				insertInfo,
				needCompatParentElement,
			});
			const [targetQuery, position] = insertInfo;
			const { COMPAT_ELEMENT_PREFIX } = elementAttributes.oypb;
			const { PLAYER_BAR_PARENT_CLASSNAME } = elementAttributes.COMPAT_ELEMENT;
			const COMPAT_ELEMENT_DATA_VALUE = "playerBarParentForStyle";
			const existCompatParent = document.querySelector(
				`[${COMPAT_ELEMENT_PREFIX}=${COMPAT_ELEMENT_DATA_VALUE}]`,
			);

			const pureBarEl = await waitElement(barQuery);
			let barEl: Element = pureBarEl;
			if (needCompatParentElement) {
				// TODO: たぶんここplayermode切り替えたらvhrome-bottomごと消してしまう気がする
				if (existCompatParent) {
					existCompatParent.remove();
				}
				const compatParent = document.createElement("div");
				compatParent.setAttribute(
					COMPAT_ELEMENT_PREFIX,
					COMPAT_ELEMENT_DATA_VALUE,
				);

				compatParent.className = PLAYER_BAR_PARENT_CLASSNAME; // this ytp style is exist at origin player contaier.
				compatParent.appendChild(pureBarEl);
				barEl = compatParent;
			}

			const targetEl = await waitElement(targetQuery);
			return targetEl.insertAdjacentElement(position, barEl);
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
	direction: ContentScriptState["currentBehavior"]["positionPlayerBar"];
	playerMode: ContentScriptState["siteMeta"]["videoPlayerMode"];
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
		const exec = __resolveAdjacentElement(queryMap);
		return await exec();
	};

	const execAttr = documentElementAttr(elementAttributes.oypb.IS_OUTSIDE);

	const movedElement = await execMove(playerMode, direction);
	movedElement && direction === "outside" ? execAttr.set() : execAttr.remove();
};
