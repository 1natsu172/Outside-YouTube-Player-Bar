import { describe, expect, test, vi } from "vitest";
import { logger, reCreateLoggerInstance } from "./logger.js";

const mockLogFn = vi.fn();

// モジュールモックすると参照が実際の挙動と変わってしまうのでやめたが、もしかすると今後この方法でテストする可能性もあるので残しておく
// let spyLog: MockInstance
// vi.mock('./logger.js', async () => {
//   const originalModule = await vi.importActual<typeof imported>('./logger.js')
//   return {
//     ...originalModule,
//     reCreateLoggerInstance: vi.fn<
//       Parameters<(typeof imported)['reCreateLoggerInstance']>
//     >((...args) => {
//       // 既存の実装を呼び出す
//       originalModule.reCreateLoggerInstance(...args)
//       // 追加の処理
//       // spyLog.mockClear()

//       mo.mockClear()
//     }),
//   }
// })

describe("logger", () => {
	test("Can do reCreateLoggerInstance", () => {
		const originalInstance = logger;
		expect(originalInstance).toBe(logger);
		reCreateLoggerInstance({ isDebug: true });
		expect(originalInstance).not.toBe(logger);
	});

	test("Silent logging when is not debugMode", () => {
		reCreateLoggerInstance({ isDebug: true });
		logger.mockTypes(() => mockLogFn);

		logger.log("testing:log:start");
		expect(mockLogFn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "testing:log:start",
        ],
      ]
    `);
		logger.log("testing:log:end");
		expect(mockLogFn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "testing:log:start",
        ],
        [
          "testing:log:end",
        ],
      ]
    `);
		expect(mockLogFn).toHaveBeenCalledTimes(2);
		reCreateLoggerInstance({ isDebug: false });
		logger.log(
			"should be silent. If it fails, this log will be recorded in the snapshot...",
		);
		expect(mockLogFn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "testing:log:start",
        ],
        [
          "testing:log:end",
        ],
      ]
    `);
	});
});
