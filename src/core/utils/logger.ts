import { LogLevels, consola } from 'consola/browser'
import { debugMode } from '@/core/infrastructures/repositories/optionRepository.js'
import { extensionNameSymbol } from '@/core/domains/constants.js'

export let logger = createLogger({ isDebug: debugMode.defaultValue })

// Support change option reacted.
debugMode.watch((current, prev) => {
  if (current !== prev) {
    logger = createLogger({ isDebug: current })
  }
})

function createLogger({ isDebug }: { isDebug: boolean }) {
  const _logger = consola.withTag(extensionNameSymbol)

  if (isDebug) {
    _logger.level = LogLevels.debug
  } else {
    _logger.level = LogLevels.silent
  }

  return _logger
}
