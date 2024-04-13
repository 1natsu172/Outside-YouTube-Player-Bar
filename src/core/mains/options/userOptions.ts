import type { ExtensionBehavior } from '../extensionFeatures.js'
import type { Option } from './options.types.js'

export interface UserOptions {
  defaultViewBehaviorV1: Option<ExtensionBehavior>
  theaterModeBehaviorV1: Option<ExtensionBehavior>
  fullscreenBehaviorV1: Option<ExtensionBehavior>
}

type DefaultViewBehaviorOpt = UserOptions['defaultViewBehaviorV1']
export class DefaultViewBehaviorOption {
  static config: DefaultViewBehaviorOpt['__static__config'] = {
    storageArea: 'sync',
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
