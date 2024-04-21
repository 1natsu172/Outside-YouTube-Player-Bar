import { extensionNameSymbol } from "@/core/mains/meta.js";
import { debugMode } from "@/core/repositories/options.repository.js";
import { LogLevels, consola } from "consola/browser";

export let logger = createLogger({ isDebug: debugMode.defaultValue });
export type Logger = typeof logger;

type LoggerSettings = {
	isDebug: boolean;
	tag?: string;
};

export function createLogger({ isDebug, tag }: LoggerSettings) {
	const _logger = consola.withTag(tag || extensionNameSymbol);

	if (isDebug) {
		/**
		 * NOTE: https://github.com/unjs/consola?tab=readme-ov-file#log-level
		 * > Consola only shows logs with configured log level or below. (Default is 3)
		 * https://i.gyazo.com/cd2802a833f0817f52a0fabe2020c9d7.png
		 * */
		_logger.level = LogLevels.debug;
		_logger.info("LogLevels of logger =>", _logger.level);
	} else {
		_logger.level = LogLevels.silent;
	}

	return _logger;
}

export function reCreateLoggerInstance(settings: LoggerSettings) {
	logger = createLogger(settings);
}
