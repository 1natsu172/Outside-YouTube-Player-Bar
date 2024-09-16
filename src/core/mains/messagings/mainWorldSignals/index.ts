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
 */
export const mainWorldSignals = defineCustomEventMessaging<MainWorldSignals>({
	namespace: extensionMainWorldScriptName,
	logger: logger.withTag(extensionMainWorldScriptName),
});

// -------------------
// NOTE: CS ⇔ BGのメッセージングが必要になったら戻す
// type MainWorldAgencySignals = {};

// /**
//  * Signals for mediation process for MAIN world, communicating with service-worker.
//  * communicating: ISOLATED content-script ⇔ background(service-worker)
//  */
// export const mainWorldAgencySignals =
// 	defineExtensionMessaging<MainWorldAgencySignals>({
// 		logger: logger.withTag(extensionMainWorldScriptName),
// 	});
