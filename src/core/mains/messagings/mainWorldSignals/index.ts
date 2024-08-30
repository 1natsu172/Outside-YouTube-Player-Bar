import { extensionMainWorldScriptName } from "@/core/mains/meta.js";
import { defineWindowMessaging } from "@webext-core/messaging/page";

interface ProtocolMap {
	wakeupPlayerbar(data: unknown): void;
}

export const mainWorldSignals = defineWindowMessaging<ProtocolMap>({
	namespace: extensionMainWorldScriptName,
	logger: logger.withTag(extensionMainWorldScriptName),
});
