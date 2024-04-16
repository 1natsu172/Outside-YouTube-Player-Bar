// Generated by wxt
import "wxt/browser";

declare module "wxt/browser" {
  export type PublicPath =
    | "/_locales/en/messages.json"
    | "/_locales/ja/messages.json"
    | "/background.js"
    | "/content-scripts/content.js"
    | "/content-scripts/testing.js"
    | "/images/icon-128.png"
    | "/images/icon-16.png"
    | "/images/icon-32.png"
    | "/images/icon-48.png"
    | "/images/oypb-toggle.svg"
    | "/options.html"
    | "/popup.html"
  type HtmlPublicPath = Extract<PublicPath, `${string}.html`>
  export interface WxtRuntime extends Runtime.Static {
    getURL(path: PublicPath): string;
    getURL(path: `${HtmlPublicPath}${string}`): string;
  }
}
