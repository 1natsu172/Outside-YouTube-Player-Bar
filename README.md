# Outside YouTube Player Bar

![](https://raw.githubusercontent.com/1natsu172/Outside-YouTube-Player-Bar/master/promo/Screenshot_1280x800-hero.png)

Display YouTube's player bar outside the video.

## DOWNLOAD ON THE 

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/gmlbhbdkhnfhhmhdjopdbcfliajcafde.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/users/gmlbhbdkhnfhhmhdjopdbcfliajcafde.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/gmlbhbdkhnfhhmhdjopdbcfliajcafde.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)

[![Chrome Web Store](https://user-images.githubusercontent.com/7282145/43437359-9cef5c20-94c3-11e8-8b77-4e5f818ff6b3.png)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)

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
