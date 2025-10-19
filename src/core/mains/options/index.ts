import type { ExtensionMetaOptions } from "./extensionMetaOptions.js";
import * as EXT_META from "./extensionMetaOptions.js";
import type { UserOptions } from "./userOptions.js";
import * as USER from "./userOptions.js";

/** @public */
export type AllOptionsDefs = ExtensionMetaOptions & UserOptions;
/** @public */
export type AllOptionsKeys = keyof AllOptionsDefs;
export type AllOptionsValues = {
	[K in keyof AllOptionsDefs]: AllOptionsDefs[K]["entity"]["value"];
};
export type AllOptionsMeta = {
	[K in keyof AllOptionsDefs]: AllOptionsDefs[K]["entity"]["meta"];
};

export const allOptionsConfigInstance = { ...EXT_META, ...USER };
