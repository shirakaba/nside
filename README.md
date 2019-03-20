<h1 align=center>
    <a href="https://github.com/shirakaba/nside/blob/master/app/App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/icon-1024.png" title="NS:IDE">
        <img alt="NS:IDE" src="/app/App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/icon-1024.png" height="256" />
    </a>
    <br>
    NS:IDE
</h1>

<!-- [![Version](https://badge.fury.io/js/badge-list.svg)](http://badge.fury.io/js/badge-list) -->
<!-- [![GitHub version](https://badge.fury.io/gh/shirakaba%2Fnside.svg)](http://badge.fury.io/gh/shirakaba%2Fnside) -->
<!-- [![Open Issues](http://githubbadges.herokuapp.com/shirakaba/nside/issues.svg?style=flat)](https://github.com/shirakaba/nside/issues) -->
<!-- [![Pending Pull-requests](http://githubbadges.herokuapp.com/shirakaba/nside/pulls.svg?style=flat)](https://github.com/boennemann/badges/pulls) -->

<p align="center">
    <a href="https://github.com/shirakaba/nside">
        <img src="http://githubbadges.com/star.svg?user=shirakaba&repo=nside&style=flat">
    </a>
    <a href="https://github.com/shirakaba/nside/fork">
        <img src="http://githubbadges.com/fork.svg?user=shirakaba&repo=nside&style=flat">
    </a>
    <a href="https://github.com/ellerbrock/open-source-badge/">
        <img src="https://badges.frapsoft.com/os/gpl/gpl.svg?v=102">
    </a>
    <a href="http://makeapullrequest.com">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
    </a>
    <a href="https://twitter.com/intent/follow?screen_name=LinguaBrowse">
        <img src="https://img.shields.io/twitter/follow/LinguaBrowse.svg?style=social&logo=twitter">
    </a>
</p>

<p align=center>NS:IDE is the NativeScript IDE that lets you get 'inside' your device.</p>
<p align=center>Access any native functionality at run-time by calling a Javascript API that binds to the Obj-C (iOS) or Java (Android) run-time.</p>

<p align="center">
    <a href="https://itunes.apple.com/us/app/nside/id1446068686?ls=1&mt=8"><img src="https://birchlabs.co.uk/linguabrowse/img/Download_on_the_App_Store_Badge_US-UK_135x40.svg"></a>
</p>

## Features

* Made in NativeScript
* Syntax highlighting
* Very dangerous auto-complete functionality based on `eval()`
* Access to the whole native run-time, fully documented on [nativescript.org](https://www.nativescript.org) for both iOS and Android (see note below)
* Potential to introduce TypeScript, if a contributor is feeling brave, or at least TypeScript's auto-completion (NativeScript is fully-typed!)

**NOTE:** I haven't yet implemented Android support because I lack the expertise to produce a syntax highlighter component for it, but it's perfectly possible in future.

## Demo

See my [teaser tweet](https://twitter.com/LinguaBrowse/status/1069531994336436224) for a video demo.

### Example screenshots

<div style="display: flex; width: 100%;">
    <img alt="auto-complete" src="/example-images/auto-complete.png" width="300px" </img>
    <img alt="native manipulation" src="/example-images/native-manipulation.png" width="300px"</img>
</div>

### Example usage

See the 'Examples' tab in-app (or [view them in this repo](https://github.com/shirakaba/nside/blob/master/app/examples/examples-view-model.ts)).

See also my [grimoire](https://github.com/shirakaba/nativescript-grimoire/blob/master/README.md) detailing many fun things to invoke.

## API Documentation

The built-in auto-complete gets you the method and property names, but doesn't tell you what params to enter into functions. For this, you need to either make a good guess of what the JS-syntax equivalent is from how the native method is invoked (which is easy if the params are all primitives like numbers), or refer to the API documentation.

I myself use my custom TypeScript Playground loaded with the appropriate `tns-platform-declarations` for each platform, as the official [NativeScript Playground](https://play.nativescript.org) crashes if you add `/// <reference path="../tns-platform-declarations/ios.d.ts" />`.

My NativeScript Playground is available:

* [for iOS](https://shirakaba.github.io/NSIDE/ios/index.html)
* [for Android](https://shirakaba.github.io/NSIDE/android/index.html)

You can consult the official documentation at: https://docs.nativescript.org

It's also immensely helpful to view the platform declarations directly: https://github.com/NativeScript/NativeScript/tree/master/tns-platform-declarations


## Setup

This project assumes the following folder hierarchy:

```
.
├── nside
└── nativescript-syntax-highlighter
```

Where `nside` is this git repository, and `nativescript-syntax-highlighter` is the git repository of my NativeScript Syntax Highlighter plugin. That is to say, they are expected to be siblings.

### Get my NativeScript Syntax Highlighter plugin

I haven't published it to npm, so you'll have to clone it from [here](https://github.com/shirakaba/nativescript-syntax-highlighter):

```sh
git clone git@github.com:shirakaba/nativescript-syntax-highlighter.git
```

### Install NS:IDE dependencies

In the root directory for this project (`nside`), run this command:

```sh
npm install
```

And then maybe make yourself one of these: ☕️

### (Build and) run 

To run for iOS (Android is not supported yet):

```sh
# Compile the TypeScript sources to JS.
# (Do this in a separate terminal, as it's an interactive command)
./node_modules/.bin/tsc --watch

# Build-and-run on a simulator or real phone.
# (This is shorthand for "prepare, build and deploy".)
tns run ios
```

And now maybe make yourself one of these: 🍵

Full documentation for `tns run ios` [here](https://docs.nativescript.org/tooling/docs-cli/project/testing/run-ios). Useful flags to pass:

* `--hmr`: activates hot module reloading (I highly recommend it).
* `--bundle`: I fall back to this when webpack starts misbehaving under `--hmr`.
* `--clean`: forces a complete rebuild. Useful if you run into caching problems.
* `--emulator`: instructs NativeScript to run the app in the iOS Simulator even if you have your device connected.

## Licence

### Libraries

The NativeScript libraries are Apache-licensed (`NativeScript-Licence.txt`), whereas this project itself use a GPL 3 licence `LICENCE.txt`.

[NativeScript Syntax Highlighter](https://github.com/shirakaba/nativescript-syntax-highlighter) is Apache 2.0 licensed, and makes use of the MIT-licensed [Highlightr](https://github.com/raspu/Highlightr) iOS native library.

### Art

The NS:IDE logo itself is made from images from the [Firefox OS emojis](https://github.com/mozilla/fxemoji) under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence. Modifications are as follows, and the Photoshop file can be consulted here ([appicon.psd](https://github.com/shirakaba/nside/blob/master/psd/appicon.psd)).

* `u1F50D-leftmagnifyingglass` – colours adjusted, and glass portion made transparent
* `u1F4AC-speechbubble` – colours adjusted, and masked off to show only the speech lines
* `u1F4F1-cellphone` – colours adjusted
* `u1F52C-microscope` – (unused in the end, but present in the Photoshop file)
* `u1F5AE-wiredkeyboard` – (unused in the end, but present in the Photoshop file)

## More of my stuff

<div style="display: flex;">
    <img src="/readme_img/LinguaBrowse.PNG" width="64px"</img>
    <img src="/readme_img/TheBox.PNG" width="64px"</img>
</div>

* [LinguaBrowse](https://itunes.apple.com/us/app/linguabrowse/id1281350165?ls=1&mt=8) (iOS) on the App Store – made in Swift
* [LinguaBrowse](https://itunes.apple.com/gb/app/linguabrowse/id1422884180?mt=12) (macOS) on the App Store – made in React Native + TypeScript + Swift
* [Plucky Box](https://itunes.apple.com/us/app/plucky-box/id1375337845?ls=1&mt=8) (iOS) on the App Store, [GitHub](https://github.com/shirakaba/react-native-typescript-2d-game), [expo.io](https://expo.io/@bottledlogic/the-box) as Android/iOS – made in React Native + TypeScript
* [@LinguaBrowse](https://twitter.com/LinguaBrowse) – my Twitter account. I talk about NativeScript, React Native, TypeScript, Chinese, Japanese, and my apps on there.
