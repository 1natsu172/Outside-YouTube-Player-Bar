# Outside YouTube Player Bar

[![Travis (.org) branch](https://img.shields.io/travis/1natsu172/Outside-YouTube-Player-Bar/master.svg?style=for-the-badge)](https://travis-ci.org/1natsu172/Outside-YouTube-Player-Bar)

![](https://raw.githubusercontent.com/1natsu172/Outside-YouTube-Player-Bar/master/promo/Screenshot_1280x800-hero.png)

Display YouTube's player bar outside the video.

## DOWNLOAD ON THE 

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/gmlbhbdkhnfhhmhdjopdbcfliajcafde.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/users/gmlbhbdkhnfhhmhdjopdbcfliajcafde.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/gmlbhbdkhnfhhmhdjopdbcfliajcafde.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)

[![Chrome Web Store](https://user-images.githubusercontent.com/7282145/43437359-9cef5c20-94c3-11e8-8b77-4e5f818ff6b3.png)](https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde)

***

# FOR DEVELOPER GUIDE (WIP)

## Installation

	$ npm install

## Release

1. `yarn release-git` でmanifest.json含めてBumpしてくれます
2. GitHub上でrelease noteを記述する
3. ZIP生成してstoreに上げる

※ webstoreの自動リリースまわり壊れています。直すコスパも悪いので`build:package`でzip生成してupするのでOKです。
## Globals

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. It will be set to `development` unless you use the `--production` option.


**Example:** `./app/background.ts`

```typescript
if(process.env.NODE_ENV === 'development'){
  console.log('We are in development mode!');
}
```

## i18n localization by translation

### Guide

* [chrome.i18n(https://developer.chrome.com/extensions/i18n)](https://developer.chrome.com/extensions/i18n)

**Directory** `./app/_locales/*`

Put on your locale files. 

* List of languages supported by Chrome
    * [https://developer.chrome.com/webstore/i18n?csw=1#localeTable](https://developer.chrome.com/webstore/i18n?csw=1#localeTable)
