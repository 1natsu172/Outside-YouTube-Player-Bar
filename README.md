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

## Installation & dev

```
pnpm install && pnpm run dev
```

Default dev browser is chrome. You can change other browser.

- `pnpm run dev:firefox`
- `pnpm run dev:edge`
- `pnpm run dev:chrome`
- `pnpm run dev:arc`

### If add new defined value to storage item

If the unreleased versioning schema is changed during development, the option must be discarded once (reset to defaultValue).

[![Image from Gyazo](https://i.gyazo.com/5b692ce0041c6ea10b5735cd2d65a0cc.png)](https://gyazo.com/5b692ce0041c6ea10b5735cd2d65a0cc)

If you want to change a schema that has been released once, you need to migrate to a new version. (ref: https://wxt.dev/guide/storage.html#versioning)

## Release

[DEPLOY.md](./DEPLOY.md)

SEE chrome devconsole: https://chrome.google.com/webstore/devconsole

## i18n localization by translation

### Guide

* [chrome.i18n(https://developer.chrome.com/extensions/i18n)](https://developer.chrome.com/extensions/i18n)

**Directory** `./src/_locales/*`

Put on your locale files. 

* List of languages supported by Chrome
    * [https://developer.chrome.com/webstore/i18n?csw=1#localeTable](https://developer.chrome.com/webstore/i18n?csw=1#localeTable)
