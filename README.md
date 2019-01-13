# NS:IDE

NS:IDE is the NativeScript IDE that lets you get 'inside' your device. Access any native functionality at run-time by calling a Javascript API that binds to the Obj-C or Java run-time (for iOS or Android respectively). I haven't yet implemented Android support because I lack the expertise to produce a syntax highlighter component for it, but it's perfectly possible in future.

<img src="/app/App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/icon-1024.png" height="400" />

## Features

* Syntax highlighting
* Very dangerous auto-complete functionality based on `eval()`
* Access to the whole native run-time, fully documented on [nativescript.org](https://www.nativescript.org) for both iOS and Android (although Android won't be usable in practice for now, as it lacks UI support as I mentioned above)
* Potential to introduce TypeScript, if a contributor is feeling brave, or at least TypeScript's auto-completion (NativeScript is fully-typed!)

## Demo

See my [teaser tweet](https://twitter.com/LinguaBrowse/status/1069531994336436224) for a video demo.

## Setup

Details to come. As a quick note: probably just the standard `npm install` and NativeScript's usual command for running ios apps. I ran it with hot reloading.

## Licence

The NativeScript libraries are Apache-licensed (`NativeScript-Licence.txt`), whereas this project itself use a GPL 3 licence `LICENCE.txt`.
