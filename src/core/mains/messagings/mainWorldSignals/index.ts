import { extensionMainWorldScriptName } from "@/core/mains/meta.js";
import { defineCustomEventMessaging } from "@webext-core/messaging/page";

interface MainWorldSignals {
	scriptReady(is: boolean): void;
	wakeUpPlayerBar(data: unknown): void;
	hidePlayerBar(data: unknown): void;
}

/**
 * Signals communicating with MAIN world script.
 * communicating: MAIN world script ⇔ ISOLATED content-script
 * @deprecated https://github.com/aklinker1/webext-core/issues/57 のMAIN WORLDとの通信に問題があるのが解消されるあでフリーズする。直ったらこれを使うようにする
 */
export const mainWorldSignals = defineCustomEventMessaging<MainWorldSignals>({
	namespace: extensionMainWorldScriptName,
	logger: logger.withTag(extensionMainWorldScriptName),
});

// type MainWorldAgencySignals = {};

// /**
//  * Signals for mediation process for MAIN world, communicating with service-worker.
//  * communicating: ISOLATED content-script ⇔ background(service-worker)
//  */
// export const mainWorldAgencySignals =
// 	defineExtensionMessaging<MainWorldAgencySignals>({
// 		logger: logger.withTag(extensionMainWorldScriptName),
// 	});
