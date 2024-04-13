import * as EXT_META from './extensionMetaOptions.js'
import * as USER from './userOptions.js'
import type { ExtensionMetaOptions } from './extensionMetaOptions.js'

export type AllOptionDefs = ExtensionMetaOptions

export const AllOptions = { ...EXT_META, ...USER }
