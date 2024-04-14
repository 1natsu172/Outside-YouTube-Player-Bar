import * as EXT_META from './extensionMetaOptions.js'
import * as USER from './userOptions.js'
import type { ExtensionMetaOptions } from './extensionMetaOptions.js'
import type { UserOptions } from './userOptions.js'

export type AllOptionsDefs = ExtensionMetaOptions & UserOptions

export const allOptionsConfig = { ...EXT_META, ...USER }
