/**
 * process.env augmentation
 * Typings for `.env*` properties
 */
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * @secret token
			 * @defineAt .env.sentry-build-plugin or CI env variables
			 */
			SENTRY_AUTH_TOKEN?: string;
		}
	}
}

export type {};
