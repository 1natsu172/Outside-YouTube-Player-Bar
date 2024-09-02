import { extensionMainWorldScriptName } from "@/core/mains/meta.js";
import { defineWindowMessaging } from "@webext-core/messaging/page";

interface ProtocolMap {
	onReadyMainWorld(is: boolean): void;
	wakeUpPlayerBar(data: unknown): void;
	hidePlayerBar(data: unknown): void;
}

export const mainWorldSignals = defineWindowMessaging<ProtocolMap>({
	namespace: extensionMainWorldScriptName,
	logger: logger.withTag(extensionMainWorldScriptName),
});
