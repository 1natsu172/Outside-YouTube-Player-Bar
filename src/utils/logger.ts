import { LogLevels, consola } from 'consola/browser'
import { debugMode } from '@/core/repositories/optionRepository.js'
import { extensionNameSymbol } from '@/core/models/meta.js'

export let logger = createLogger({ isDebug: debugMode.defaultValue })
export type Logger = typeof logger

type LoggerSettings = {
  isDebug: boolean
  tag?: string
}

export function createLogger({ isDebug, tag }: LoggerSettings) {
  const _logger = consola.withTag(tag || extensionNameSymbol)

  if (isDebug) {
    _logger.level = LogLevels.debug
  } else {
    _logger.level = LogLevels.silent
  }

  return _logger
}

export function reCreateLoggerInstance(settings: LoggerSettings) {
  logger = createLogger(settings)
}
