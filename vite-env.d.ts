/// <reference types="vite/client" />

/**
 * @references
 * https://vitejs.dev/guide/env-and-mode.html#env-files
 * https://vitejs.dev/config/shared-options.html#define
 */

/**
 * Declarations for import.meta.env[keys]
 */
interface ImportMetaEnv {
	/**
	 * @defineAt .env.development
	 * @property "true" | "false"
	 */
	readonly VITE_DEBUG_STATE_LOG: string;

	/**
	 * @only vitest
	 * @defineAt vitest.config.ts
	 * @property "true" | "false"
	 */
	readonly RUN_ON_TESTING: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// # Augmenting Global Definitions
/**
 * @defineAt vite.config.ts
 */
declare const __APP_VERSION__: readonly string;
