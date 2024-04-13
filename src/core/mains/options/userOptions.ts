import type { ExtensionBehavior } from '../extensionFeatures.js'
import type { Option } from './options.types.js'

const CONST_KEY = 'option:USER'

export interface UserOptions<CK extends string = typeof CONST_KEY> {
  defaultViewBehaviorV1: Option<CK, ExtensionBehavior>
  theaterModeBehaviorV1: Option<CK, ExtensionBehavior>
  fullscreenBehaviorV1: Option<CK, ExtensionBehavior>
}

type DefaultViewBehaviorOpt = UserOptions['defaultViewBehaviorV1']
export class DefaultViewBehaviorOption {
  static config: DefaultViewBehaviorOpt['__static__config'] = {
    storageArea: 'sync',
    storageKey: `${CONST_KEY}:defaultViewBehavior`,
    version: 1,
    defaultValue: {
      alwaysDisplayPlayerBar: true,
      positionPlayerBar: 'outside',
    },
    defaultMeta: {},
  }
  constructor(
    public value: DefaultViewBehaviorOpt['value'],
    public meta: DefaultViewBehaviorOpt['meta'],
  ) {}
}

type TheaterModeBehaviorOpt = UserOptions['theaterModeBehaviorV1']
export class TheaterModeBehaviorOption {
  static config: TheaterModeBehaviorOpt['__static__config'] = {
    storageArea: 'sync',
    storageKey: `${CONST_KEY}:theaterModeBehavior`,
    version: 1,
    defaultValue: {
      alwaysDisplayPlayerBar: true,
      positionPlayerBar: 'outside',
    },
    defaultMeta: {},
  }
  constructor(
    public value: TheaterModeBehaviorOpt['value'],
    public meta: TheaterModeBehaviorOpt['meta'],
  ) {}
}

type FullscreenBehaviorOpt = UserOptions['fullscreenBehaviorV1']
export class FullscreenBehaviorOption {
  static config: FullscreenBehaviorOpt['__static__config'] = {
    storageArea: 'sync',
    storageKey: `${CONST_KEY}:fullscreenBehavior`,
    version: 1,
    defaultValue: {
      alwaysDisplayPlayerBar: false,
      positionPlayerBar: 'inside',
    },
    defaultMeta: {},
  }
  constructor(
    public value: FullscreenBehaviorOpt['value'],
    public meta: FullscreenBehaviorOpt['meta'],
  ) {}
}
