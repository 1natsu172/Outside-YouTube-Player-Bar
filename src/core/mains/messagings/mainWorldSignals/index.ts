import { extensionMainWorldScriptName } from "@/core/mains/meta.js";
import { defineCustomEventMessaging } from "@webext-core/messaging/page";

type SimpleRes = {
	result: "ok" | "ng";
	error?: Error;
};

interface MainWorldSignals {
	scriptReady(is: boolean): void;
	wakeUpPlayerBar(): SimpleRes;
	wakeUpPlayerBarOnce(): SimpleRes;
	clearWakeUpPlayerBar(): SimpleRes;
	hidePlayerBar(): SimpleRes;
}

/**
 * Signals communicating with MAIN world script.
 * communicating: MAIN world script ⇔ ISOLATED content-script
 */
// TODO: retry汎用化をする
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
