import { extensionNameSymbol } from "@/core/mains/meta.js";
import { LogLevels, consola } from "consola/browser";

export let logger = createLogger({ isDebug: import.meta.env.DEV });
export type Logger = typeof logger;

type LoggerSettings = {
	isDebug: boolean;
	tag?: string;
};

export function createLogger({ isDebug, tag }: LoggerSettings) {
	const IS_RUN_ON_TESTING = import.meta.env.RUN_ON_TESTING;

	const _logger = consola.withTag(tag || extensionNameSymbol);

	if (isDebug) {
		/**
		 * NOTE: https://github.com/unjs/consola?tab=readme-ov-file#log-level
		 * > Consola only shows logs with configured log level or below. (Default is 3)
		 * https://i.gyazo.com/cd2802a833f0817f52a0fabe2020c9d7.png
		 * */
		_logger.level = LogLevels.debug;
	} else {
		_logger.level = LogLevels.silent;
	}

	if (IS_RUN_ON_TESTING !== "true") {
		_logger.info("LogLevels of logger =>", _logger.level);
	}
	return _logger;
}

export function reCreateLoggerInstance(settings: LoggerSettings) {
	logger = createLogger(settings);
}
