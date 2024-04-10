import { debugMode } from '@/core/repositories/optionRepository.js'
import { reCreateLoggerInstance } from '@/core/utils/logger.js'

export const initializeDebugMode = () => {
  // Support change option reacted.
  return debugMode.watch((current, prev) => {
    if (current !== prev) {
      reCreateLoggerInstance({ isDebug: current })
    }
  })
}
