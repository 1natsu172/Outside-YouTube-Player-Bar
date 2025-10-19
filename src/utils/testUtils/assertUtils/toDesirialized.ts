/**
 * シリアライズとデシリアライズの処理をシミュレートする関数
 * JSON.stringifyとJSON.parseの往復を行う
 */
export const toDesirialized = <T>(obj: T): T => {
	return JSON.parse(JSON.stringify(obj));
};
