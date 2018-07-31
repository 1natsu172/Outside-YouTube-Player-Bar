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

## Usage

Run `$ gulp --watch` and load the `dist`-directory into chrome.

## Entryfiles (bundles)

There are two kinds of entryfiles that create bundles.

1. All ts-files in the root of the `./app/scripts` directory
2. All css-,scss- and less-files in the root of the `./app/styles` directory

## Tasks

### Build

    $ gulp


| Option         | Description                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include `livereload.js` in your bundle.                      |
| `--production` | Minifies all assets                                                                                                                                   |
| `--verbose`    | Log additional data to the console.                                                                                                                   |
| `--vendor`     | Compile the extension for different vendors (chrome, firefox, opera, edge)  Default: chrome                                                                 |
| `--sourcemaps` | Force the creation of sourcemaps. Default: !production                                                                                                |


### pack

Zips your `dist` directory and saves it in the `packages` directory.

    $ gulp pack --vendor=firefox

### Version

Increments version number of `manifest.json` and `package.json`,
commits the change to git and adds a git tag.


    $ gulp patch      // => 0.0.X

or

    $ gulp feature    // => 0.X.0

or

    $ gulp release    // => X.0.0


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
