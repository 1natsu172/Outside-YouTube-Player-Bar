import type { DefinedItem } from "@/core/infrastructures/storage/index.js";
import type {
	AllOptionsMeta,
	AllOptionsValues,
} from "@/core/mains/options/index.js";
import * as repo from "@/core/repositories/options.repository.js";
import { defuArrayFn } from "defu";

/**
 * NOTE: WXT storageがTmetadataはRecord型かつOptionalUpdateに対応しているのでいいが、TValueはRecordではないので、_generalUpdate関数内部で更に抽象化しようとするとTValueの型が複雑になる。なのでここではTValue/Tmetadataを受け取ってstorageに流すバリアントに留めている。
 */
export const _generalUpdate = async <
	TValue,
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	TMetadata extends Record<string, unknown> = {},
>(
	definedItem: DefinedItem<TValue, TMetadata>,
	tValue: TValue,
	tMetadata?: TMetadata,
) => {
	await definedItem.setValue(tValue);

	if (tMetadata !== undefined) {
		await definedItem.setMeta(tMetadata);
	}
};

//// extensionMetaOptions
/**
 * NOTE: wxt/storageがTMetadataはPartial<Record>で受け入れるので素通りさせてOKだが、TValueはDefinedItemごとにmergeすべき形が異なるので、各usecase内で整合させる実装にしている
 */
export const setDebugModeOption = async (
	option?: Partial<AllOptionsValues["debugModeV1"]>,
	meta?: Partial<AllOptionsMeta["debugModeV1"]>,
) => {
	const _repo = repo.debugMode;
	const currentOption = await _repo.getValue();
	const _option = option ?? currentOption;
	await _generalUpdate(_repo, _option, meta);
};
export const setForceDisableOption = async (
	option?: Partial<AllOptionsValues["forceDisableV1"]>,
	meta?: Partial<AllOptionsMeta["forceDisableV1"]>,
) => {
	const _repo = repo.forceDisable;
	const currentOption = await _repo.getValue();
	const _option = option ?? currentOption;
	await _generalUpdate(_repo, _option, meta);
};

//// UserOptions
export const setDefaultViewBehaviorOption = async (
	option?: Partial<AllOptionsValues["defaultViewBehaviorV1"]>,
	meta?: Partial<AllOptionsMeta["defaultViewBehaviorV1"]>,
) => {
	const _repo = repo.defaultViewBehaviorOption;
	const currentOption = await _repo.getValue();
	const _option = defuArrayFn(
		{
			...option,
			// NOTE: make unique values with merging
			// @ts-expect-error
			inheritPositionPlayerBarBeforeSwitching: (curr) => [
				...new Set([
					...curr,
					...(option?.inheritPositionPlayerBarBeforeSwitching ?? []),
				]),
			],
		},
		currentOption,
	);
	await _generalUpdate(_repo, _option, meta);
};
export const setTheaterModeBehaviorOption = async (
	option?: Partial<AllOptionsValues["theaterModeBehaviorV1"]>,
	meta?: Partial<AllOptionsMeta["theaterModeBehaviorV1"]>,
) => {
	const _repo = repo.theaterModeBehaviorOption;
	const currentOption = await _repo.getValue();
	const _option = defuArrayFn(
		{
			...option,
			// NOTE: make unique values with merging
			// @ts-expect-error
			inheritPositionPlayerBarBeforeSwitching: (curr) => [
				...new Set([
					...curr,
					...(option?.inheritPositionPlayerBarBeforeSwitching ?? []),
				]),
			],
		},
		currentOption,
	);
	await _generalUpdate(_repo, _option, meta);
};
export const setFullscreenBehaviorOption = async (
	option?: Partial<AllOptionsValues["fullscreenBehaviorV1"]>,
	meta?: Partial<AllOptionsMeta["fullscreenBehaviorV1"]>,
) => {
	const _repo = repo.fullscreenBehaviorOption;
	const currentOption = await _repo.getValue();
	const _option = defuArrayFn(
		{
			...option,
			// NOTE: make unique values with merging
			// @ts-expect-error
			inheritPositionPlayerBarBeforeSwitching: (curr) => [
				...new Set([
					...curr,
					...(option?.inheritPositionPlayerBarBeforeSwitching ?? []),
				]),
			],
		},
		currentOption,
	);
	await _generalUpdate(_repo, _option, meta);
};
export const setShowOpenSettingsIconOption = async (
	option?: Partial<AllOptionsValues["showOpenSettingsIconV1"]>,
	meta?: Partial<AllOptionsMeta["showOpenSettingsIconV1"]>,
) => {
	const _repo = repo.showOpenSettingsIconOption;
	const currentOption = await _repo.getValue();
	const _option = option ?? currentOption;
	await _generalUpdate(_repo, _option, meta);
};
