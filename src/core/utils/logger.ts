import { LogLevels, consola } from 'consola/browser'

const _logger = () => {
  const logger = consola

  // const isDEV = import.meta.env.DEV
  // const isPROD = import.meta.env.PROD
  const isDebug = true // TODO: オプションから取る

  if (isDebug) {
    logger.level = LogLevels.debug
  } else {
    logger.level = LogLevels.silent
  }

  return logger
}

export const logger = _logger()
