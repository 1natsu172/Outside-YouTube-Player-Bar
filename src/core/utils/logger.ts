import { LogLevels, consola } from 'consola/browser'
import { debugMode } from '@/core/repositories/optionRepository.js'
import { extensionNameSymbol } from '@/core/models/meta.js'

export let logger = createLogger({ isDebug: debugMode.defaultValue })
export default { logger }
export type Logger = typeof logger

export function createLogger({ isDebug }: { isDebug: boolean }) {
  const _logger = consola.withTag(extensionNameSymbol)

  if (isDebug) {
    _logger.level = LogLevels.debug
  } else {
    _logger.level = LogLevels.silent
  }

  return _logger
}

export function reCreateLoggerInstance(settings: { isDebug: boolean }) {
  logger = createLogger(settings)
}
