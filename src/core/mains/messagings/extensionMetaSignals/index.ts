import { defineExtensionMessaging } from "@webext-core/messaging";

interface ProtocolMap {
	reloadYouTubeTabs: () => void;
}

export const extMetaSignals = defineExtensionMessaging<ProtocolMap>();
