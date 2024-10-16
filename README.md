# Outside YouTube Player Bar

![](https://raw.githubusercontent.com/1natsu172/Outside-YouTube-Player-Bar/master/promo/Screenshot_1280x800-hero.png)

Display YouTube's player bar outside the video.

## DOWNLOAD ON THE 

### Chrome
[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/gmlbhbdkhnfhhmhdjopdbcfliajcafde.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)
[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/gmlbhbdkhnfhhmhdjopdbcfliajcafde.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/stars/gmlbhbdkhnfhhmhdjopdbcfliajcafde.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)

<a href="https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde" target="_blank"><img src="./promo/Chrome-Web-Store-available-in-the.png" alt="Chrome Web Store" width=490/></a>


### Mozilla Firefox
![Mozilla Add-on Version](https://img.shields.io/amo/v/%7B6c3b7240-7017-430b-b03c-432e61ee3a82%7D?style=for-the-badge)
[![Mozilla Add-on Users](https://img.shields.io/amo/users/%7B6c3b7240-7017-430b-b03c-432e61ee3a82%7D?style=for-the-badge)](https://addons.mozilla.org/firefox/addon/outside-youtube-player-bar)
[![Mozilla Add-on Rating](https://img.shields.io/amo/rating/%7B6c3b7240-7017-430b-b03c-432e61ee3a82%7D?style=for-the-badge)](https://addons.mozilla.org/firefox/addon/outside-youtube-player-bar)
[![Mozilla Add-on Stars](https://img.shields.io/amo/stars/%7B6c3b7240-7017-430b-b03c-432e61ee3a82%7D?style=for-the-badge)](https://addons.mozilla.org/firefox/addon/outside-youtube-player-bar)

<a href="https://addons.mozilla.org/firefox/addon/outside-youtube-player-bar" target="_blank"><img src="./promo/Firefox-get-the-addon.svg" alt="Mozilla GET THE ADD-ON" width=490/></a>

### Microsoft Edge
<a href="https://microsoftedge.microsoft.com/addons/detail/cgmpfcjkhpmpcomcbpapfpdcalmpgjgb" target="_blank"><img src="./promo/Microsoft-get-it-from.svg" alt="Edge add-ons" width=490/></a>

***

# FOR DEVELOPER GUIDE

## Requirements

- Node.js
  - Version info in `./.tool-versions`
- pnpm
  - Version info in `packageManager` field of `./package.json`

## Setup

You must use pnpm. At the first, `corepack enable`.

Ready for use the pnpm, then install dependencies.

```
pnpm install
```

## Start development

```
pnpm run dev
```

Default dev browser is chrome. You can change other browser.

- `pnpm run dev:firefox`
- `pnpm run dev:edge`
- `pnpm run dev:chrome`
- `pnpm run dev:arc`

## Create release build and zip

- `pnpm run build`
  - Builds for all browsers. Outputs to the `.output` dir.
- `pnpm run zip`
  - Zips for all browsers. Outputs to the `.output` dir.

### Specific browser target

You can add `:<browser>` suffix to the script commands.

- `pnpm run build:firefox`
- `pnpm run zip:firefox`
- …… other browsers

## About the storage

### If add new defined value to storage item

If the unreleased versioning schema is changed during development, the option must be discarded once (reset to defaultValue).

[![Image from Gyazo](https://i.gyazo.com/5b692ce0041c6ea10b5735cd2d65a0cc.png)](https://gyazo.com/5b692ce0041c6ea10b5735cd2d65a0cc)

If you want to change a schema that has been released once, you need to migrate to a new version. (ref: https://wxt.dev/guide/storage.html#versioning)

## Release

[DEPLOY.md](./DEPLOY.md)

## i18n localization by translation

### Guide

* [chrome.i18n(https://developer.chrome.com/extensions/i18n)](https://developer.chrome.com/extensions/i18n)

**Directory** `./src/_locales/*`

Put on your locale files. 

* List of languages supported by Chrome
    * [https://developer.chrome.com/webstore/i18n?csw=1#localeTable](https://developer.chrome.com/webstore/i18n?csw=1#localeTable)

## Testing

### e2e

#### debug locator

To debug locator in a single scenario, use grep option in cli. (https://playwright.dev/docs/test-cli#reference)

```
pnpm run test:e2e --grep "defaultView outside" --debug
```

> grep example: "<describe-grep><space><test-title-grep>"

#### update snapshots

Use update flag via cli. (https://playwright.dev/docs/test-snapshots#updating-screenshots)

Below is an example of updating only a specific test scenario.

```
pnpm run test:e2e --grep "fullscreen .*: positionPlayerBar" --update-snapshots
```
