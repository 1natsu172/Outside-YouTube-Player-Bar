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
	): (() => Promise<Element | null>) => {
		return async () => {
			const [targetQuery, position] = insertInfo;
			const targetEl = await waitElement(targetQuery);
			const barEl = await waitElement(barQuery);
			return targetEl.insertAdjacentElement(position, barEl);
		};
	};

	const { playerBar, parentElement, siblingElement } = elementQueryMap;
	switch (true) {
		case !!parentElement[0]: {
			return __createInsertElementFn(playerBar, parentElement);
		}
		case !!siblingElement[0]: {
			return __createInsertElementFn(playerBar, siblingElement);
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
			},
			outside: {
				playerBar: elementQuery.PLAYER_BAR,
				parentElement: ["#player.ytd-watch-flexy", "beforeend"],
				siblingElement: [undefined, undefined],
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
			},
			outside: {
				playerBar: elementQuery.PLAYER_BAR,
				parentElement: [undefined, undefined],
				siblingElement: ["#full-bleed-container.ytd-watch-flexy", "afterend"], // theater container is island element, so must move to sibling
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
			},
			outside: {
				playerBar: elementQuery.PLAYER_BAR,
				parentElement: [undefined, undefined],
				siblingElement: ["#full-bleed-container.ytd-watch-flexy", "afterend"], // theater container is island element, so must move to sibling
			},
		},
		none: {
			inside: {
				playerBar: "",
				parentElement: [undefined, undefined],
				siblingElement: [undefined, undefined],
			},
			outside: {
				playerBar: "",
				parentElement: [undefined, undefined],
				siblingElement: [undefined, undefined],
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
