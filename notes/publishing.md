References:

* https://www.nativescript.org/blog/steps-to-publish-your-nativescript-app-to-the-app-stores
* https://docs.nativescript.org/tooling/publishing/publishing-ios-apps
* 

## Alter `Info.plist` and `build.xcconfig`

(See commmit "prepare for release")

## Generate splashscreens

```sh
tns resources generate splashes psd/splash.png --background "#272734"
```

## Register app ID

https://developer.apple.com/account/ios/identifier/bundle/create


## Create a new Provisioning Profile

https://developer.apple.com/account/ios/profile/create

* Distribution: "App Store"
* App ID: NSIDE

> Select the certificates you wish to include in this provisioning profile. To use this profile to install an app, the certificate the app was signed with must be included.

* Certificate: Two options for "iOS Distribution" are available. Pick the most recently-dated one (I picked 'Nov 11 2019' rather than 'Apr 19 2019'), i.e. the one with the longest validity remaining on it.
* Provide a `Profile Name`: "NSIDE iOS Distribution"
* Download the created certificate and double-click it to install it to your keychain.
* 
<!-- (Ultimately didn't work)
## Bundle

```sh
tns build ios --bundle --release --forDevice --teamId TVU9P2GAL9
```

## Publish

```sh
tns publish ios --ipa /Volumes/Transcend/NSIDE/platforms/ios/build/device/NSIDE.ipa
``` -->

## Prepare to submit from Xcode

```sh
tns prepare ios
```

Matched the "Code Signing Identity" in Build Settings with that of LinguaBrowse iOS.

Archived and submitted with no problems (although this current Xcode has a bug of saying "Certificate: None" "Profile: Unknown" or vice versa ).