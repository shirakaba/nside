<h1 align=center>
    <a href="https://github.com/shirakaba/nside/blob/master/app/App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/icon-1024.png" title="NS:IDE">
        <img alt="NS:IDE" src="/app/App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/icon-1024.png" height="256" />
    </a>
    <br>
    NS:IDE
</h1>

<p align=center>
NS:IDE is the NativeScript IDE that lets you get 'inside' your device. Access any native functionality at run-time by calling a Javascript API that binds to the Obj-C (iOS) or Java (Android) run-time.
</p>

## Features

* Syntax highlighting
* Very dangerous auto-complete functionality based on `eval()`
* Access to the whole native run-time, fully documented on [nativescript.org](https://www.nativescript.org) for both iOS and Android (see note below)
* Potential to introduce TypeScript, if a contributor is feeling brave, or at least TypeScript's auto-completion (NativeScript is fully-typed!)

**NOTE:** I haven't yet implemented Android support because I lack the expertise to produce a syntax highlighter component for it, but it's perfectly possible in future.

## Demo

See my [teaser tweet](https://twitter.com/LinguaBrowse/status/1069531994336436224) for a video demo.

## Setup

Details to come. As a quick note: probably just the standard `npm install` and NativeScript's usual command for running ios apps. I ran it with hot reloading.

## Licence

The NativeScript libraries are Apache-licensed (`NativeScript-Licence.txt`), whereas this project itself use a GPL 3 licence `LICENCE.txt`.
