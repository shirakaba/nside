<h1 align=center>
    <a href="https://github.com/shirakaba/nside/blob/master/app/App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/icon-1024.png" title="NS:IDE">
        <img alt="NS:IDE" src="/app/App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/icon-1024.png" height="256" />
    </a>
    <br>
    NS:IDE
</h1>

<!-- [![Version](https://badge.fury.io/js/badge-list.svg)](http://badge.fury.io/js/badge-list) -->
<!-- [![GitHub version](https://badge.fury.io/gh/shirakaba%2Fnside.svg)](http://badge.fury.io/gh/shirakaba%2Fnside) -->
[![star this repo](http://githubbadges.com/star.svg?user=shirakaba&repo=nside&style=flat)](https://github.com/boennemann/badges)
[![fork this repo](http://githubbadges.com/fork.svg?user=shirakaba&repo=nside&style=flat)](https://github.com/boennemann/badges/fork)
[![Open Source Love](https://badges.frapsoft.com/os/gpl/gpl.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
[![Open Issues](http://githubbadges.herokuapp.com/shirakaba/nside/issues.svg?style=flat)](https://github.com/boennemann/badges/issues)
[![Follow on Twitter](https://img.shields.io/twitter/follow/LinguaBrowse.svg?style=social&logo=twitter)](https://twitter.com/intent/follow?screen_name=LinguaBrowse)
<!-- [![Pending Pull-requests](http://githubbadges.herokuapp.com/shirakaba/nside/pulls.svg?style=flat)](https://github.com/boennemann/badges/pulls) -->

<p align=center>NS:IDE is the NativeScript IDE that lets you get 'inside' your device.</p>
<p align=center>Access any native functionality at run-time by calling a Javascript API that binds to the Obj-C (iOS) or Java (Android) run-time.</p>

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

### Run 

To run for iOS (Android is not supported yet):

```sh
# This is shorthand for "prepare, build and deploy".
tns run ios
```

And now maybe make yourself one of these: 🍵

Full documentation for `tns run ios` [here](https://docs.nativescript.org/tooling/docs-cli/project/testing/run-ios). Useful flags to pass:

* `--hmr`: activates hot module reloading (I highly recommend it).
* `--clean`: forces a complete rebuild. Useful if you run into caching problems.
* `--emulator`: instructs NativeScript to run the app in the iOS Simulator even if you have your device connected.

## Licence

The NativeScript libraries are Apache-licensed (`NativeScript-Licence.txt`), whereas this project itself use a GPL 3 licence `LICENCE.txt`.

## More of my stuff

<div style="display: flex;">
    <img src="/readme_img/LinguaBrowse.PNG" width="64px"</img>
    <img src="/readme_img/TheBox.PNG" width="64px"</img>
</div>

* [LinguaBrowse](https://itunes.apple.com/us/app/linguabrowse/id1281350165?ls=1&mt=8) (iOS) on the App Store – made in Swift
* [LinguaBrowse](https://itunes.apple.com/gb/app/linguabrowse/id1422884180?mt=12) (macOS) on the App Store – made in React Native + TypeScript + Swift
* [Plucky Box](https://itunes.apple.com/us/app/plucky-box/id1375337845?ls=1&mt=8) (iOS) on the App Store, [GitHub](https://github.com/shirakaba/react-native-typescript-2d-game), [expo.io](https://expo.io/@bottledlogic/the-box) as Android/iOS – made in React Native + TypeScript
* [@LinguaBrowse](https://twitter.com/LinguaBrowse) – my Twitter account. I talk about NativeScript, React Native, TypeScript, Chinese, Japanese, and my apps on there.
