import { debugMode } from '@/core/repositories/optionsRepository.js'
import { reCreateLoggerInstance } from '@/utils/logger.js'

export const initializeDebugMode = () => {
  // Support change option reacted.
  return debugMode.watch((current, prev) => {
    if (current !== prev) {
      reCreateLoggerInstance({ isDebug: current })
    }
  })
}
