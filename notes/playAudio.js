function makeLabel(text, bounds){
    const label = UILabel.alloc().initWithFrame(bounds);
    label.text = text;
    label.numberOfLines = 0;
    label.adjustsFontSizeToFitWidth = false;
    label.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
    label.translatesAutoresizingMaskIntoConstraints = true;
    label.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,0,1);

    return label;
}

function playAudioFromDownloadedFile(url){
    let player;
    try {
        player = AVAudioPlayer.alloc().initWithContentsOfURLFileTypeHintError(url, AVFileTypeMPEGLayer3);

        // const playerItem = AVPlayerItem.alloc().initWithURL(url);
        // player = AVPlayer.alloc().initWithPlayerItem(playerItem);
    } catch(error){
        // The error is a JS error, not an NSError.
        global.label.text = error.toString();
        return null;
    }
    // if(player instanceof AVAudioPlayer){
        player.prepareToPlay();
    // }
    player.numberOfLoops = -1; // loop forever
    player.volume = 1.0;
    player.play();
    global.label.text = "Should be playing";

    return player;
}

function downloadFileFromURL(url){
    NSURLSession.sharedSession.downloadTaskWithURLCompletionHandler(
        url,
        (urlB, response, error) => {
            if(error){
                global.label.text = error.code.toString();
            } else {
                // global.label.text = "No download error.";
                // global.label.text = response.MIMEType;
                global.label.text = urlB.absoluteString;
            }
            global.player = playAudioFromDownloadedFile(urlB);
        }
    ).resume();
    // global.label.text = "Resumed.";
}

global.label = makeLabel("Initialised.", design.ios.bounds);
design.ios.addSubview(global.label);

downloadFileFromURL(
    NSURL.alloc().initWithString("https://birchlabs.co.uk/blog/alex/juicysfplugin/synth/cpp/2019/01/05/TheBox_compressed_less.mp3")
);