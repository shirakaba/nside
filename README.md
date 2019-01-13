<h1 align=center>
    <a href="https://github.com/shirakaba/nside/blob/master/app/App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/icon-1024.png" title="NS:IDE">
        <img alt="NS:IDE" src="/app/App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/icon-1024.png" height="256" />
    </a>
    <br>
    NS:IDE
</h1>

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
