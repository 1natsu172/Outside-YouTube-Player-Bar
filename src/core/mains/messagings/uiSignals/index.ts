import { defineExtensionMessaging } from "@webext-core/messaging";

interface ProtocolMap {
	openOptionsPage: () => void;
}

export const { sendMessage, onMessage } =
	defineExtensionMessaging<ProtocolMap>();
