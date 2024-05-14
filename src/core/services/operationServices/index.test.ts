import {
	behaviorState,
	operationState,
} from "@/core/repositories/contentScript.repository.js";
import { setPlayerBarIntersection } from "@/core/usecases/operationState.usecase.js";
import { resetProxyState } from "@/utils/testUtils/valtioUtil/resetProxyState.js";
import { beforeEach, describe, expect, test } from "vitest";
import { changePositionPlayerBar } from "../behaviorServices/positionPlayerBar.service.js";
import { playerBarIntersectionOperation } from "./index.js";

const resetBehaviorState = resetProxyState(behaviorState);
const resetOperationState = resetProxyState(operationState);

beforeEach(() => {
	resetBehaviorState();
	resetOperationState();
});

describe(playerBarIntersectionOperation.name, () => {
	describe("if current bar position is outside", () => {
		beforeEach(() => {
			changePositionPlayerBar({ to: "outside" });
		});

		test("should change to inside & shouldRestoreToOutside flag if disappeared", () => {
			expect(behaviorState.positionPlayerBar).toBe("outside");
			expect(operationState.uiOps.playerBarIntersection).toStrictEqual({
				shouldRestoreToOutside: false,
				shouldHidePlayerBarButton: false,
			});

			playerBarIntersectionOperation({ intersect: "disappeared" });

			expect(operationState.uiOps.playerBarIntersection).toStrictEqual({
				shouldRestoreToOutside: true,
				shouldHidePlayerBarButton: true,
			});
			expect(behaviorState.positionPlayerBar).toBe("inside");
		});

		test("should not change anything states if littleAppeared", () => {
			expect(operationState.uiOps.playerBarIntersection).toStrictEqual({
				shouldRestoreToOutside: false,
				shouldHidePlayerBarButton: false,
			});
			expect(behaviorState.positionPlayerBar).toBe("outside");

			playerBarIntersectionOperation({ intersect: "littleAppeared" });

			expect(operationState.uiOps.playerBarIntersection).toStrictEqual({
				shouldRestoreToOutside: false,
				shouldHidePlayerBarButton: false,
			});
			expect(behaviorState.positionPlayerBar).toBe("outside");
		});
	});

	describe("if current bar position is inside", () => {
		beforeEach(() => {
			changePositionPlayerBar({ to: "inside" });
		});

		test("should not change anything states if disappeared and sould not restore flag", () => {
			expect(operationState.uiOps.playerBarIntersection).toStrictEqual({
				shouldRestoreToOutside: false,
				shouldHidePlayerBarButton: false,
			});
			expect(behaviorState.positionPlayerBar).toBe("inside");

			playerBarIntersectionOperation({ intersect: "disappeared" });

			expect(operationState.uiOps.playerBarIntersection).toStrictEqual({
				shouldRestoreToOutside: false,
				shouldHidePlayerBarButton: false,
			});
			expect(behaviorState.positionPlayerBar).toBe("inside");
		});

		test("should restore position to outside if littleAppeared and  shouldRestoreToOutside", () => {
			setPlayerBarIntersection({
				shouldRestoreToOutside: true,
				shouldHidePlayerBarButton: true,
			});
			expect(behaviorState.positionPlayerBar).toBe("inside");
			expect(operationState.uiOps.playerBarIntersection).toStrictEqual({
				shouldRestoreToOutside: true,
				shouldHidePlayerBarButton: true,
			});

			playerBarIntersectionOperation({ intersect: "littleAppeared" });

			expect(operationState.uiOps.playerBarIntersection).toStrictEqual({
				shouldRestoreToOutside: false,
				shouldHidePlayerBarButton: false,
			});
			expect(behaviorState.positionPlayerBar).toBe("outside");
		});
	});
});
