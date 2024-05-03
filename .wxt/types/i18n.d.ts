// Generated by wxt
import "wxt/browser";

declare module "wxt/browser" {
  /**
   * See https://developer.chrome.com/docs/extensions/reference/i18n/#method-getMessage
   */
  interface GetMessageOptions {
    /**
     * See https://developer.chrome.com/docs/extensions/reference/i18n/#method-getMessage
     */
    escapeLt?: boolean
  }

  export interface WxtI18n extends I18n.Static {
    /**
     * The extension or app ID; you might use this string to construct URLs for resources inside the extension. Even unlocalized extensions can use this message.
Note: You can't use this message in a manifest file.
     *
     * "<browser.runtime.id>"
     */
    getMessage(
      messageName: "@@extension_id",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * No message description.
     *
     * "<browser.i18n.getUiLocale()>"
     */
    getMessage(
      messageName: "@@ui_locale",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * The text direction for the current locale, either "ltr" for left-to-right languages such as English or "rtl" for right-to-left languages such as Japanese.
     *
     * "<ltr|rtl>"
     */
    getMessage(
      messageName: "@@bidi_dir",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * If the @@bidi_dir is "ltr", then this is "rtl"; otherwise, it's "ltr".
     *
     * "<rtl|ltr>"
     */
    getMessage(
      messageName: "@@bidi_reversed_dir",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * If the @@bidi_dir is "ltr", then this is "left"; otherwise, it's "right".
     *
     * "<left|right>"
     */
    getMessage(
      messageName: "@@bidi_start_edge",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * If the @@bidi_dir is "ltr", then this is "right"; otherwise, it's "left".
     *
     * "<right|left>"
     */
    getMessage(
      messageName: "@@bidi_end_edge",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * The name of the application
     *
     * "Outside YouTube Player Bar"
     */
    getMessage(
      messageName: "appName",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * The short_name (maximum of 12 characters recommended) is a short version of the app's name.
     *
     * "oypb"
     */
    getMessage(
      messageName: "appShortName",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * The description of the application
     *
     * "Display YouTube's player bar outside the video."
     */
    getMessage(
      messageName: "appDescription",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * The title of the browser action button
     *
     * "Outside YouTube Player Bar"
     */
    getMessage(
      messageName: "browserActionTitle",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * Tooltip text for toggle button when extension is active
     *
     * "Inside player bar"
     */
    getMessage(
      messageName: "tooltipText_toInside",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * Tooltip text for toggle button when extension is inactive
     *
     * "Outside player bar"
     */
    getMessage(
      messageName: "tooltipText_toOutside",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * Tooltip text for open settings
     *
     * "Open settings"
     */
    getMessage(
      messageName: "tooltipText_openSettings",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * popup.html's title
     *
     * "Welcome to Outside YouTube Player Bar!"
     */
    getMessage(
      messageName: "popup_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * popup.html's description
     *
     * "Please contact GitHub Issue about this extension. Maintenance is handled on a best-effort basis."
     */
    getMessage(
      messageName: "popup_description",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * popup.html's please review message
     *
     * "Please review if you don't mind."
     */
    getMessage(
      messageName: "popup_pleaseReview",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * popup.html's Please review link
     *
     * "Write a review at the chrome web store"
     */
    getMessage(
      messageName: "popup_pleaseReviewLink",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * popup.html's footer author lead
     *
     * "Author"
     */
    getMessage(
      messageName: "popup_footerAuthor",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * settings page title
     *
     * "Settings for Outside YouTube Player Bar"
     */
    getMessage(
      messageName: "settings_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * Enable to DebugMode
     *
     * "Enable Debug Mode"
     */
    getMessage(
      messageName: "settings_metaOption_debugMode_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * Usually not used
     *
     * "Usually not used"
     */
    getMessage(
      messageName: "settings_metaOption_debugMode_description",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * Enable force disable mode
     *
     * "Force disable the extension"
     */
    getMessage(
      messageName: "settings_metaOption_forceDisable_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * usecase the force disable mode
     *
     * "Use this feature if the extension is not working or if it is causing issues with YouTube's UI or functionality, and you want to temporarily disable it."
     */
    getMessage(
      messageName: "settings_metaOption_forceDisable_description",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * settings extension behavor of the each player modes
     *
     * "Default settings for each player mode"
     */
    getMessage(
      messageName: "settings_userOption_behaviors_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * behavior of the default-view mode
     *
     * "Behavior in default view"
     */
    getMessage(
      messageName: "settings_userOption_defaultViewBehavior_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * behavior of the theater mode
     *
     * "Behavior in theater mode"
     */
    getMessage(
      messageName: "settings_userOption_theaterModeBehavior_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * behavior of the fullscreen mode
     *
     * "Behavior in fullscreen mode"
     */
    getMessage(
      messageName: "settings_userOption_fullscreenBehavior_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * position player bar
     *
     * "Position of the player bar"
     */
    getMessage(
      messageName: "settings_userOption_positionPlayerBar_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * outside of player
     *
     * "Outside"
     */
    getMessage(
      messageName: "settings_userOption_positionPlayerBar_outside",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * inside of player
     *
     * "Inside"
     */
    getMessage(
      messageName: "settings_userOption_positionPlayerBar_inside",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * always display player bar
     *
     * "Always display player bar"
     */
    getMessage(
      messageName: "settings_userOption_alwaysDisplayPlayerBar_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * always apply default behavior setting if video mode changed
     *
     * "Apply default settings whenever video mode changes"
     */
    getMessage(
      messageName: "settings_userOption_alwaysApplyDefaultBehaviorSettings_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * example of the always apply default behavior settings
     *
     * "If checked: (e.g.) If the default setting is outside and you temporarily set it to inside, it will switch back to outside when you change video modes."
     */
    getMessage(
      messageName: "settings_userOption_alwaysApplyDefaultBehaviorSettings_description",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * Display settings icon on the playerbar
     *
     * "Display settings icon on the player bar"
     */
    getMessage(
      messageName: "settings_userOption_showOpenSettingsIcon_title",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
    /**
     * How to re-open guide that after disabled
     *
     * "※ After disabling this, to re-open the settings, click the extension icon in the browser or open the options from the browser's extension management page."
     */
    getMessage(
      messageName: "settings_userOption_showOpenSettingsIcon_description",
      substitutions?: string | string[],
      options?: GetMessageOptions,
    ): string;
  }
}
